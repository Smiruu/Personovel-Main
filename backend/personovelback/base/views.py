from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import *
from .serializers import *
import rest_framework.status as status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import NotFound, PermissionDenied
from django.db.models import Avg
from user.models import User
from collections import Counter
from django.db.models import Count, Sum
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from .permissions import IsPaidUserOrAdmin
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import Comment, Reply
from rest_framework.exceptions import ValidationError
from django.db import transaction
# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
    'http://127.0.0.1:8000/api/books/',
    'http://127.0.0.1:8000/api/genres/',
    'http://127.0.0.1:8000/api/authors/',
    'http://127.0.0.1:8000/api/interactions/',
    'http://127.0.0.1:8000/api/interactions/book/',
    'http://127.0.0.1:8000/api/feedbacks/',
]
    return Response(routes)

from base.products import products

@api_view(['GET'])
def search(request):
    print("Request:", request)
    query = request.query_params.get('query', '')
    print("Received query:", query)

    # Search for books based on title, author, or genre
    books_by_title = Book.objects.filter(title__icontains=query)
    books_by_author = Book.objects.filter(author__name__icontains=query)
    books_by_genre = Book.objects.filter(genre__name__icontains=query)
    books_by_language = Book.objects.filter(language__icontains=query)
    
    # Combine the querysets and remove duplicates
    books = (books_by_title | books_by_author | books_by_genre | books_by_language).distinct()
    
    # Serialize the results
    books_serializer = BookSerializer(books, many=True)

    serializer = BookSerializer(books, many=True)
    return Response({
        'books': books_serializer.data,
    })


@api_view(['GET', 'POST'])
def getBooks(request):
    if request.method == 'GET':
        books = Book.objects.annotate(mean_rating=Avg('rating__rating'))
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getBook(request, pk):
    try:
        book = Book.objects.get(pk=pk)
        serializer = BookSerializer(book, many=False)
        return Response(serializer.data)
    except Book.DoesNotExist:
        return Response({'detail': 'Book does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({'detail': 'Invalid Book ID'}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateBook(request, pk):
    try:
        book = Book.objects.get(pk=pk)
        serializer = BookSerializer(instance=book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Book.DoesNotExist:
        return Response({'detail': 'Book does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({'detail': 'Invalid Book ID'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteBook(request, pk):
    try:
        book = Book.objects.get(pk=pk)
        book.delete()
        return Response({'detail': 'Book deleted successfully'})
    except Book.DoesNotExist:
        return Response({'detail': 'Book does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({'detail': 'Invalid Book ID'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def getGenre(request, pk):
    try:
        genre = Genre.objects.get(pk=pk)
        serializer = GenreSerializer(genre, many=False)
        return Response(serializer.data)
    except Genre.DoesNotExist:
        return Response({'detail': 'Genre does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({'detail': 'Invalid Genre ID'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def getGenres(request):
    if request.method == 'GET':
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = GenreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateGenre(request, pk):
    try:
        genre = Genre.objects.get(pk=pk)
        serializer = GenreSerializer(instance=genre, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Genre.DoesNotExist:
        return Response({'detail': 'Genre does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({'detail': 'Invalid Genre ID'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteGenre(request, pk):
    try:
        genre = Genre.objects.get(pk=pk)
        genre.delete()
        return Response({'detail': 'Genre deleted successfully'})
    except Genre.DoesNotExist:
        return Response({'detail': 'Genre does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({'detail': 'Invalid Genre ID'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def getAuthors(request):
    if request.method == 'GET':
        authors = Author.objects.all()
        serializer = AuthorSerializer(authors, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AuthorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def getAuthor(request, pk):
    try:
        author = Author.objects.get(pk=pk)
        serializer = AuthorSerializer(author, many=False)
        return Response(serializer.data)
    except Author.DoesNotExist:
        return Response({'detail': 'Author does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({'detail': 'Invalid Author ID'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateAuthor(request, pk):
    try:
        author = Author.objects.get(pk=pk)
        serializer = AuthorSerializer(instance=author, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Author.DoesNotExist:
        return Response({'detail': 'Author does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({'detail': 'Invalid Author ID'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteAuthor(request, pk):
    try:
        author = Author.objects.get(pk=pk)
        author.delete()
        return Response({'detail': 'Author deleted successfully'})
    except Author.DoesNotExist:
        return Response({'detail': 'Author does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({'detail': 'Invalid Author ID'}, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['GET', 'POST'])
def getFeedbacks(request):
    if request.method == 'GET':
        feedbacks = Feedback.objects.all()
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteFeedback(request, pk):
    try:
        feedback = Feedback.objects.get(pk=pk)
        feedback.delete()
        return Response({'detail': 'Feedback deleted successfully'})
    except Feedback.DoesNotExist:
        return Response({'detail': 'Feedback does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({'detail': 'Invalid Feedback ID'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST'])
def getInteractions(request):
    if request.method == 'GET':
        interactions = Interaction.objects.all()
        serializer = InteractionSerializer(interactions, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = InteractionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
def getInteraction(request, pk):
    try:
        interaction = Interaction.objects.get(pk=pk)
        serializer = InteractionSerializer(interaction, many=False)
        return Response(serializer.data)
    except Interaction.DoesNotExist:
        return Response({'detail': 'Interaction does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({'detail': 'Invalid Interaction ID'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getInteractionsByBook(request, book_id):
    try:
        interactions = Interaction.objects.filter(book_id=book_id)
        serializer = InteractionSerializer(interactions, many=True)
        return Response(serializer.data)
    except ValueError:
        return Response({'detail': 'Invalid Book ID'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateInteraction(request, pk):
    try:
        interaction = Interaction.objects.get(pk=pk)
        serializer = InteractionSerializer(instance=interaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Interaction.DoesNotExist:
        return Response({'detail': 'Interaction does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({'detail': 'Invalid Interaction ID'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteInteraction(request, pk):
    try:
        interaction = Interaction.objects.get(pk=pk)
        interaction.delete()
        return Response({'detail': 'Interaction deleted successfully'})
    except Interaction.DoesNotExist:
        return Response({'detail': 'Interaction does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({'detail': 'Invalid Interaction ID'}, status=status.HTTP_400_BAD_REQUEST)

    
class RatingViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = RatingSerializer
    
    def get_queryset(self):
        return Rating.objects.filter(user=self.request.user)

    
    def get_rating_id_by_user_and_book(self, request, user_id, book_id):
        print(request)
        # Retrieve the rating based on user_id and book_id
        rating = get_object_or_404(Rating, user_id=user_id, book_id=book_id)

        # Extract the rating ID
        rating_id = rating.id

        # Return the rating ID as JSON response
        return JsonResponse({'rating_id': rating_id})
    def get_rating_by_user_and_book(request, user_id, book_id):
        # Retrieve the rating based on user_id and book_id
        rating = get_object_or_404(Rating, user_id=user_id, book_id=book_id)

        # Extract the rating value
        rating_value = rating.rating  # Assuming 'rating' is the field containing the rating value

        # Return the rating value as JSON response
        return JsonResponse({'rating': rating_value})

        
class ListRatingViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

class CreateRatingViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsPaidUserOrAdmin]

    def create(self, request, *args, **kwargs):
        print("Request Data:", request.data)
        existing_rating = Rating.objects.filter(user=request.user, book_id=request.data.get('book'))
        if existing_rating.exists():
            return Response({'detail': 'You have already rated this book'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = RatingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response({'detail': 'Rating created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED, headers=headers)


class RetrieveRatingViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Rating.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        print(queryset)
        rating_id = self.kwargs.get('pk')
        if rating_id:
            queryset = queryset.filter(id=rating_id)
        else:
            queryset = queryset.none()
        return queryset

    # Set the serializer_class attribute to use the custom serializer
    serializer_class = RatingWithoutIdSerializer

class UpdateRatingViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsPaidUserOrAdmin]
    serializer_class = RatingSerializer  # Define your serializer class here

    def get_queryset(self):
        # Customize queryset based on your requirements
        return Rating.objects.filter(user=self.request.user) 
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            return Response({'detail': 'You are not allowed to update this rating'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = RatingSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class DestroyRatingViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsPaidUserOrAdmin]
    serializer_class = RatingSerializer  # Define your serializer class here

    def get_queryset(self):
        # Customize queryset based on your requirements
        return Rating.objects.filter(user=self.request.user) 
        
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            if instance.user != request.user:
                raise PermissionDenied("You are not allowed to delete this rating")
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Rating.DoesNotExist:
            raise NotFound("Rating not found")
    
@api_view(['GET'])
def get_ratings_for_book(request, book_id):
    try:
        # Your view logic here
        ratings = Rating.objects.filter(book_id=book_id)
        num_reviews = ratings.count()
        total_rating = sum(rating.rating for rating in ratings)
        average_rating = total_rating / num_reviews if num_reviews > 0 else 0

        data = {
            'average_rating': average_rating,
            'num_reviews': num_reviews
        }
        return Response(data)
    except ValueError:
        return Response({'detail': 'Invalid Book ID'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def add_to_reading_history(request):
    try:
        # Extract book_id and user_id from request data
        book_id = request.data.get('book_id')
        user_id = request.data.get('user_id')
        
        # Retrieve the user and book objects
        user = User.objects.get(pk=user_id)
        book = Book.objects.get(pk=book_id)

        # Create a new entry in the reading history
        ReadingHistory.objects.create(user=user, book=book)

        return Response({'detail': 'Book added to reading history successfully'}, status=status.HTTP_201_CREATED)
    
    except Book.DoesNotExist:
        return Response({'detail': 'Book does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({'detail': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def latest_user_reading_history(request, user_id):
    # Retrieve the user by user ID or return 404 if not found
    User = get_user_model()
    user = get_object_or_404(User, pk=user_id)
    
    # Retrieve the latest reading history entry for the specified user ordered by read_at timestamp
    latest_history = ReadingHistory.objects.filter(user=user).order_by('-read_at').first()

    # Serialize the reading history data
    serializer = ReadingHistorySerializer(latest_history)

    # Return the serialized data in the response
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_recommended_books(request, user_id):
    try:
        print("Received GET request for get_preferred_genre")
        print("User ID:", user_id)
        
        # Fetch the user object using the user ID
        user = get_user_model().objects.get(pk=user_id)
        
        # Get the user's reading history
        reading_history = ReadingHistory.objects.filter(user=user)
        
        # Count occurrences of each book in the reading history
        book_counts = reading_history.values('book').annotate(num_read=Count('book'))

        # Get the genres of the books in the reading history
        genres = Genre.objects.filter(book__in=reading_history.values('book'))

        # Aggregate the total number of reads for each genre
        genre_counts = genres.annotate(total_reads=Count('book'))

        # Get the genre with the highest total reads
        most_common_genre = genre_counts.order_by('-total_reads').first()

        if most_common_genre:
            # Annotate the queryset with mean rating for both preferred genre and other genres
            books_in_genre = Book.objects.filter(genre=most_common_genre).annotate(mean_rating=Avg('rating__rating'))
            other_books = Book.objects.exclude(genre=most_common_genre).annotate(mean_rating=Avg('rating__rating'))

            # Combine preferred genre books and other genre books into a single list
            combined_books = list(books_in_genre) + list(other_books)

            # Sort the combined books based on their mean rating
            sorted_books = sorted(combined_books, key=lambda x: x.mean_rating if x.mean_rating is not None else float('-inf'), reverse=True)

            # Serialize the sorted books
            serializer = BookSerializer(sorted_books, many=True)

            return Response({
                'recommended_books': serializer.data
            }, status=status.HTTP_200_OK)
        else:
            # If there is no preferred genre, fetch all books and sort them based on mean rating
            all_books = Book.objects.all().annotate(mean_rating=Avg('rating__rating'))
            sorted_books = sorted(all_books, key=lambda x: x.mean_rating if x.mean_rating is not None else float('-inf'), reverse=True)
            serializer = BookSerializer(sorted_books, many=True)
            
            return Response({
                'recommended_books': serializer.data
            }, status=status.HTTP_200_OK)
    
    except User.DoesNotExist:
        return Response({'detail': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
    
@api_view(['POST'])
def set_preferred_genres(request, user_id):
    try:
        # Retrieve the authenticated user
        user = get_object_or_404(User, pk=user_id)
        
        # Extract picked genres from request data
        picked_genre_names = request.data.get('preferred_genres', [])
        print("Received genres:", picked_genre_names)

        # Check if the number of picked genres is more than three
        if len(picked_genre_names) > 3:
            raise ValidationError("You can only pick up to three genres.")

        # Clear existing preferred genres for the user
        user_preferred_genres, created = UserPreferredGenre.objects.get_or_create(user=user)
        user_preferred_genres.genres.clear()

        # Create or get existing genres and add them to the user's preferred genres
        for genre_name in picked_genre_names:
                genre = Genre.objects.filter(name=genre_name).first()
                if genre:
                    user_preferred_genres.genres.add(genre)
                else:
                    raise ValidationError(f"Genre '{genre_name}' does not exist.")

        # Serialize the user's preferred genres and return the response
        serializer = UserPreferredGenreSerializer(user_preferred_genres)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ValidationError as ve:
        return Response({'detail': str(ve)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_preferred_genres(request, user_id):
    try:
        # Retrieve the user's preferred genres
        user_preferred_genre = get_object_or_404(UserPreferredGenre, user_id=user_id)
        
        # Get the genre names associated with the user's preferred genres
        genre_names = [genre.name for genre in user_preferred_genre.genres.all()]
        
        # Return the genre names in the response
        return Response({'preferred_genres': genre_names}, status=status.HTTP_200_OK)
    except UserPreferredGenre.DoesNotExist:
        return Response({'detail': 'User preferred genres not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
def get_random_books(request, user_id):
    try:
        # Retrieve the user's preferred genres
        user_preferred_genre = get_object_or_404(UserPreferredGenre, user_id=user_id)
        
        # Get the non-null preferred genres
        preferred_genres = user_preferred_genre.genres.exclude(name__isnull=True)[:3]
        
        # Check if there are any preferred genres
        if not preferred_genres:
            return Response({'detail': 'No preferred genres found for the user'}, status=status.HTTP_404_NOT_FOUND)
        
        # Randomly select one genre from the non-null preferred genres
        random_genre = random.choice(preferred_genres)
        
        # Retrieve all books belonging to the random genre
        books = Book.objects.filter(genre=random_genre)
        
        # Sort the books by their mean_rating
        sorted_books = books.annotate(mean_rating=Avg('rating__rating')).order_by('-mean_rating')
        
        # Serialize the sorted books
        book_serializer = BookSerializer(sorted_books, many=True)
        
        # Serialize the random genre
        genre_serializer = GenreSerializer(random_genre)
        
        # Construct the response data
        response_data = {
            'genre': genre_serializer.data,
            'genre_books': book_serializer.data
        }
        
        # Return the response
        return Response(response_data, status=status.HTTP_200_OK)
    except UserPreferredGenre.DoesNotExist:
        return Response({'detail': 'User preferred genres not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsPaidUserOrAdmin])
def create_comment(request):
    if request.method == 'POST':
        # Extract data from request
        user_id = request.data.get('user_id')
        book_id = request.data.get('book_id')
        comment_text = request.data.get('comment')

        # Check if user and book exist
        user = get_object_or_404(User, pk=user_id)
        book = get_object_or_404(Book, pk=book_id)

        # Create the comment
        comment = Comment.objects.create(
            user=user,
            book=book,
            comment=comment_text
        )

        # Serialize the created comment
        serializer = CommentSerializer(comment)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({'detail': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)
    



@api_view(['GET'])
def get_comments_for_book(request, book_id):
    if request.method == 'GET':
        # Check if the book exists
        book = Book.objects.filter(pk=book_id).first()
        if not book:
            return Response({'detail': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

        # Retrieve all comments related to the book
        comments = Comment.objects.filter(book=book)
        replies = Reply.objects.filter(comment__in=comments)
        
        # Create a list to store modified comments with user profile name and picture
        modified_comments = []
        for comment in comments:
            # Modify the comment to include user profile name and picture instead of username
            modified_comment = {
                'comment_id': comment.id,
                'name': comment.user.profile.name,
                'user_id': comment.user.id,
                'picture': comment.user.profile.get_profile_image(),  # Get profile image URL
                'book_title': comment.book.title,
                'comment': comment.comment,
                'created_at': comment.created_at
            }
            modified_comments.append(modified_comment)

        modified_replies = []
        for reply in replies:
            # Modify the reply to include user profile name and picture instead of username
            modified_reply = {
                'reply_id': reply.id,
                'name': reply.user.profile.name,
                'picture': reply.user.profile.get_profile_image(),  # Get profile image URL
                'user_id': reply.user.id,
                'comment_id': reply.comment.id,
                'reply': reply.reply,
                'created_at': reply.created_at
            }
            modified_replies.append(modified_reply)
            
        response_data = {
            'comments': modified_comments,
            'replies': modified_replies
        }
        return Response(response_data, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsPaidUserOrAdmin])
def create_reply(request):
    if request.method == 'POST':
        # Extract data from request
        user_id = request.data.get('user_id')
        comment_id = request.data.get('comment_id')
        reply_text = request.data.get('reply')

        # Check if user and comment exist
        user = get_object_or_404(User, pk=user_id)
        comment = get_object_or_404(Comment, pk=comment_id)

        # Create the reply
        reply = Reply.objects.create(
            user=user,
            comment=comment,
            reply=reply_text
        )

        # Serialize the created reply
        serializer = ReplySerializer(reply)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({'detail': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_replies_for_comment(request, comment_id):
    if request.method == 'GET':
        # Check if the comment exists
        comment = Comment.objects.filter(pk=comment_id).first()
        if not comment:
            return Response({'detail': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)

        # Retrieve all replies related to the comment
        replies = Reply.objects.filter(comment=comment)
        
        # Create a list to store modified replies with user profile name
        modified_replies = []
        for reply in replies:
            # Modify the reply to include user profile name instead of username
            modified_reply = {
                'reply_id': reply.id,
                'name': reply.user.profile.name,
                'comment_id': reply.comment.id,
                'reply': reply.reply,
                'created_at': reply.created_at
            }
            modified_replies.append(modified_reply)
        
        return Response(modified_replies, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsPaidUserOrAdmin])
def add_to_favorites(request, user_id, book_id):
    user = get_object_or_404(User, pk=user_id)
    book = get_object_or_404(Book, pk=book_id)
    
    # Check if the book is already favorited by the user
    if Favorites.objects.filter(user=user, book=book).exists():
        return Response({'message': 'Book is already in favorites'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new favorite entry
    favorite = Favorites(user=user, book=book)
    favorite.save()
    serializer = FavoritesSerializer(favorite)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsPaidUserOrAdmin])
def remove_from_favorites(request, user_id, book_id):
    user = get_object_or_404(User, pk=user_id)
    book = get_object_or_404(Book, pk=book_id)
    
    if request.method == 'DELETE':
        # Check if the book is favorited by the user
        favorite = Favorites.objects.filter(user=user, book=book).first()
        if favorite:
            favorite.delete()
            return Response({'message': 'Book removed from favorites successfully'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'message': 'Book is not in favorites'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

class FavoriteListView(APIView):
    def get(self, request, user_id):
        try:
            favorites = Favorites.objects.filter(user_id=user_id)
            favorite_books = [fav.book for fav in favorites]  # Extracting books from favorites
            serializer = BookSerializer(favorite_books, many=True)  # Assuming you have a BookSerializer
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Favorites.DoesNotExist:
            return Response({'message': 'Favorites not found'}, status=status.HTTP_404_NOT_FOUND)
        





@csrf_exempt
@require_POST
def delete_all_comments_and_replies(request):
    try:
        # Delete all replies
        Reply.objects.all().delete()

        # Delete all comments
        Comment.objects.all().delete()

        return JsonResponse({'message': 'All comments and replies have been deleted successfully.'}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_comments_and_replies(request, user_id):
    try:
        # Retrieve the user object
        user = get_user_model().objects.get(pk=user_id)
        
        # Retrieve all comments made by the user
        user_comments = Comment.objects.filter(user=user)
        comment_serializer = CommentSerializer(user_comments, many=True)
        
        # Retrieve all replies made by the user
        user_replies = Reply.objects.filter(user=user)
        reply_serializer = ReplySerializer(user_replies, many=True)
        
        # Return the comments and replies
        return Response({
            'comments': comment_serializer.data,
            'replies': reply_serializer.data
        }, status=200)
    except get_user_model().DoesNotExist:
        raise Http404("User does not exist")
    
@api_view(['GET', 'POST'])
@permission_classes([IsAdminUser])
def getLogs(request):
    if request.method == 'GET':
        logs = Log.objects.all()
        serializer = LogSerializer(logs, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        # Include the user ID in the request data before passing it to the serializer
        data = request.data.copy()
        data['user'] = request.user.id  # Assuming user ID is accessible via request.user
        serializer = LogSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)