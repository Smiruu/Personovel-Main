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