from django.contrib import admin
from .models import Genre, Author, Book, Feedback, Interaction

admin.site.register(Genre)
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(Feedback)
admin.site.register(Interaction)

# Register your models here.
