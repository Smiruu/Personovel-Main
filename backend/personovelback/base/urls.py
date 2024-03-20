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
    path('interactions/<str:pk>', views.getInteraction, name="interaction"),
    path('search/', views.search, name='search_books'),
    path('interactions/book/<int:book_id>', views.getInteractionsByBook, name='book-interactions'),
    path('ratings/', views.ListRatingViewSet.as_view({'get': 'list'}), name='ratings-list'),
    path('ratings/create/', views.CreateRatingViewSet.as_view({'post': 'create'}), name='ratings-create'),
    path('ratings/<int:pk>/', views.RetrieveRatingViewSet.as_view({'get': 'retrieve'}), name='ratings-retrieve'),
    path('ratings/<int:pk>/update/', views.UpdateRatingViewSet.as_view({'put': 'update'}), name='ratings-update'),
    path('ratings/<int:pk>/delete/', views.DestroyRatingViewSet.as_view({'delete': 'destroy'}), name='ratings-delete'),
    path('ratings/<int:user_id>/<int:book_id>/get-rating-id/', views.RatingViewSet.as_view({'get': 'get_rating_id_by_user_and_book'}), name='get_rating_id_by_user_and_book'),
    path('ratings/book/<int:book_id>/', views.get_ratings_for_book, name='book-ratings'),
    path('comments/create/', views.create_comment, name='create_comment'),
    path('books/<int:book_id>/comments/', views.get_comments_for_book, name='book-comments'),
    path('replies/create/', views.create_reply, name='create_reply'),
    path('comments/<int:comment_id>/replies/', views.get_replies_for_comment, name='comment-replies'),

]