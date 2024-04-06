from django.db import models
import os
import random
from django.conf import settings
from django.db.models import Avg
from user.models import User
from collections import Counter
def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext

def upload_image_path(instance, filename):
    new_filename = random.randint(1, 3910209312)
    name, ext = get_filename_ext(filename)
    final_filename = "{new_filename}{ext}".format(new_filename=new_filename, ext=ext)
    return "img/{new_filename}/{final_filename}".format(new_filename=new_filename, final_filename=final_filename)
# Create your models here.

def upload_chapter_path(instance, filename):
    name, ext = os.path.splitext(filename)
    
    # Replace spaces with underscores in the book title
    book_name = instance.book.title.replace(" ", "_")
    
    # Construct the folder path including the book title
    folder_path = os.path.join("book_chapters", book_name)
    
    # Include chapter number in the file name
    file_name = f"Chapter_{instance.chapter_number}{ext}"
    
    # Return the full file path
    return os.path.join(folder_path, file_name)
    
class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Author(models.Model):
    name = models.CharField(max_length=100)


    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    language = models.CharField(max_length=100)
    genre = models.ForeignKey(Genre,on_delete=models.SET_NULL, null=True)
    synopsis = models.TextField()
    author = models.ForeignKey(Author,on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    
    @property
    def mean_rating(self):
        return self.rating.aggregate(Avg('rating'))['rating__avg']

    @mean_rating.setter
    def mean_rating(self, value):
        # This setter method is optional and depends on your requirements.
        # If you want to set the mean_rating explicitly, implement the setter accordingly.
        pass

    def __str__(self):
        return self.title

class Rating(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name = 'rating')
    user = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(choices=((1, '1 star'),(2, '2 star'),(3, '3 star'),(4, '4 star'),(5, '5 star')))
    created_at = models.DateTimeField(auto_now_add=True)
    
class Feedback(models.Model):
    email = models.EmailField()
    subject = models.CharField(max_length=100)
    concern = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject
    

class Interaction(models.Model):
    book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)
    chapter = models.FileField(upload_to=upload_chapter_path, blank=True, null=True)
    chapter_number = models.PositiveIntegerField(default=1)  # Add chapter number field

    def __str__(self):
        if self.book:
            return f"{self.book.title} - Chapter {self.chapter_number}" if self.chapter else f"{self.book.title} - No chapters"
        else:
            return f"No book - Chapter {self.chapter_number}" if self.chapter else "No book - No chapters"
    
    def save(self, *args, **kwargs):
        if self.pk:  # Check if the instance already exists (updating)
            existing_interaction = Interaction.objects.get(pk=self.pk)
            # Delete the old file if a new file is uploaded
            if self.chapter and self.chapter != existing_interaction.chapter:
                existing_interaction.chapter.delete(save=False)
        # Proceed with saving
        super().save(*args, **kwargs)

class ReadingHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    read_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.book.title} - {self.read_at}"
