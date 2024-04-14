from django.urls import path
from . import views
from .views import FavoriteListView


urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('books/', views.getBooks, name="books"),
    path('books/<str:pk>', views.getBook, name="book"),
    path('books/<str:pk>/update', views.updateBook, name="update-book"),
    path('books/<str:pk>/delete', views.deleteBook, name="delete-book"),

    path('genres/', views.getGenres, name="genres"),
    path('genres/<str:pk>', views.getGenre, name="genre"),
    path('genres/<str:pk>/update', views.updateGenre, name="update-genre"),
    path('genres/<str:pk>/delete', views.deleteGenre, name="delete-genre"),

    path('authors/', views.getAuthors, name="authors"),
    path('authors/<str:pk>', views.getAuthor, name="author"),
    path('authors/<str:pk>/update', views.updateAuthor, name="update-author"),
    path('authors/<str:pk>/delete', views.deleteAuthor, name="delete-author"),

    path('feedbacks/', views.getFeedbacks, name="feedbacks"),
    path('feedbacks/<str:pk>/delete', views.deleteFeedback, name="delete-feedback"),

    path('interactions/', views.getInteractions, name="interactions"),
    path('interactions/<str:pk>', views.getInteraction, name="interaction"),
    path('interactions/book/<int:book_id>', views.getInteractionsByBook, name='book-interactions'),
    path('interactions/<str:pk>/update', views.updateInteraction, name="update-interaction"),
    path('interactions/<str:pk>/delete', views.deleteInteraction, name="delete-interaction"),

    path('search/', views.search, name='search_books'),

    path('ratings/', views.ListRatingViewSet.as_view({'get': 'list'}), name='ratings-list'),
    path('ratings/create/', views.CreateRatingViewSet.as_view({'post': 'create'}), name='ratings-create'),
    path('ratings/<int:pk>/', views.RetrieveRatingViewSet.as_view({'get': 'retrieve'}), name='ratings-retrieve'),
    path('ratings/<int:pk>/update/', views.UpdateRatingViewSet.as_view({'put': 'update'}), name='ratings-update'),
    path('ratings/<int:pk>/delete/', views.DestroyRatingViewSet.as_view({'delete': 'destroy'}), name='ratings-delete'),
    path('ratings/<int:user_id>/<int:book_id>/get-rating-id/', views.RatingViewSet.as_view({'get': 'get_rating_id_by_user_and_book'}), name='get_rating_id_by_user_and_book'),
    path('ratings/book/<int:book_id>/', views.get_ratings_for_book, name='book-ratings'),
    
   
    path('add_to_reading_history/', views.add_to_reading_history, name='add_to_reading_history'),
    path('get_recommended_books/<int:user_id>/', views.get_recommended_books, name='get_preferred_genre'),  
    path('reading-history/<int:user_id>/', views.latest_user_reading_history, name='latest_user_reading_history'),
    path('users/<int:user_id>/preferred-genre/', views.set_preferred_genres, name='set_preferred_genre'),
    path('users/<int:user_id>/get-preferred-genres/', views.get_preferred_genres, name='get_preferred_genres'),
    path('users/<int:user_id>/random-books/', views.get_random_books, name='get_random_books'),

    path('comments/create/', views.create_comment, name='create_comment'),
    path('comments/book/<int:book_id>/', views.get_comments_for_book, name='get_comments_for_book'),

    path('replies/create/', views.create_reply, name='create_reply'),
    path('replies/comment/<int:comment_id>/', views.get_replies_for_comment, name='get_replies_for_comment'),

     path('users/<int:user_id>/comments-and-replies/', views.get_user_comments_and_replies, name='user-comments-and-replies'),

    path('<int:user_id>/add-to-favorites/<int:book_id>/', views.add_to_favorites, name='add_to_favorites'),
    path('<int:user_id>/remove-from-favorites/<int:book_id>/', views.remove_from_favorites, name='remove_from_favorites'),
    path('<int:user_id>/favorites/', FavoriteListView.as_view(), name='favorite_list'),

    path('delete-comments-and-replies/', views.delete_all_comments_and_replies, name='delete_comments_and_replies'),

    path('logs/', views.getLogs, name='logs'),

]