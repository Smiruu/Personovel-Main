from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Genre, Author, Book, Feedback, Interaction, Rating, Favorites
from django.db.models import Avg


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Author.objects.all()
    )
    genre = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Genre.objects.all()
    )
    mean_rating = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = '__all__'

    def get_mean_rating(self, obj):
        # Calculate the mean rating for the book
        mean_rating = obj.rating.aggregate(Avg('rating'))['rating__avg']
        return mean_rating if mean_rating is not None else 0

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'

class RatingWithoutIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['created_at', 'rating']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

class InteractionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Interaction
        fields = '__all__'


class FavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = '__all__'