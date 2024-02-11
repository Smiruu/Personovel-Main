from django.urls import path
from . import views



urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>', views.getProduct, name="product"),
    path('books/', views.getBooks, name="books"),
    path('books/<str:pk>', views.getBook, name="book"),
    path('genres/', views.getGenres, name="genres"),
    path('genres/<str:pk>', views.getGenre, name="genre"),
    path('authors/', views.getAuthors, name="authors"),
    path('authors/<str:pk>', views.getAuthor, name="author"),
    path('feedbacks/', views.getFeedbacks, name="feedbacks"),
    path('interactions/', views.getInteractions, name="interactions"),
]