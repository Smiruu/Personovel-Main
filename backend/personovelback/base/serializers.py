from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Genre, Author, Book, Feedback, Interaction 

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
    book = serializers.SlugRelatedField(
    slug_field='title',
    queryset=Author.objects.all()
    )
    class Meta:
        model = Interaction
        fields = '__all__'  