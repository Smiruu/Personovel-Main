from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

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
    class Meta:
        model = Book
        fields = '__all__'


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

class InteractionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Interaction
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'

class RatingWithoutIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['created_at', 'rating']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id','user', 'book', 'content', 'created_at']

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['id', 'user', 'comment', 'content', 'created_at']  # Change 'text' to 'content'
        read_only_fields = ['user', 'created_at']