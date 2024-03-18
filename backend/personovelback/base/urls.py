from django.urls import path
from . import views



urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('books/', views.getBooks, name="books"),
    path('books/<str:pk>', views.getBook, name="book"),
    path('genres/', views.getGenres, name="genres"),
    path('genres/<str:pk>', views.getGenre, name="genre"),
    path('authors/', views.getAuthors, name="authors"),
    path('authors/<str:pk>', views.getAuthor, name="author"),
    path('feedbacks/', views.getFeedbacks, name="feedbacks"),
    path('interactions/', views.getInteractions, name="interactions"),
    path('interactions/<str:pk>', views.getInteraction, name="interaction"),
    path('search/', views.search, name='search_books'),
    path('interactions/book/<int:book_id>', views.getInteractionsByBook, name='book-interactions'),
    
]