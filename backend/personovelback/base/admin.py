from django.contrib import admin
from .models import *

admin.site.register(Genre)
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(Feedback)
admin.site.register(Interaction)
admin.site.register(ReadingHistory)
# Register your models here.
