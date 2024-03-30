from django.urls import path
from . import views



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
    
   

]