from django.db import models
from django.contrib.auth.models import User
import os
import random

def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext

def upload_image_path(instance, filename):
    new_filename = random.randint(1, 3910209312)
    name, ext = get_filename_ext(filename)
    final_filename = "{new_filename}{ext}".format(new_filename=new_filename, ext=ext)
    return "img/{new_filename}/{final_filename}".format(new_filename=new_filename, final_filename=final_filename)

def upload_chapter_path(instance, filename):
    name, ext = get_filename_ext(filename)

    book_name = instance.book.title.replace(" ", "_")  
    chapter_number = instance.chapter_number if instance.chapter_number else "Unknown"  
    
    return os.path.join("chapters", book_name, f"Chapter_{chapter_number}{ext}")

# Create your models here.

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

    
    def __str__(self):
        return self.title


    
class Feedback(models.Model):
    email = models.EmailField()
    subject = models.CharField(max_length=100)
    concern = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject

class Interaction(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, null=True)
    chapter_number = models.PositiveIntegerField()  # Assuming chapter number is stored as a positive integer
    chapter = models.FileField(upload_to=upload_chapter_path)

    def __str__(self):
        if self.book:
            return f"{self.book.title} - Chapter {self.chapter_number}" if self.chapter_number else f"{self.book.title} - No chapters"
        else:
            return f"No book - Chapter {self.chapter_number}" if self.chapter_number else "No book - No chapters"

    def save(self, *args, **kwargs):
        if not self.chapter_number:
            total_chapters = Interaction.objects.filter(book=self.book).count() + 1
            self.chapter_number = total_chapters
        super().save(*args, **kwargs)