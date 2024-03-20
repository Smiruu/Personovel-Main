from django.contrib import admin
from .models import Genre, Author, Book, Feedback, Interaction, Rating

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'book', 'rating', 'created_at')
    list_filter = ('user', 'book', 'rating')
    search_fields = ('user__username', 'book__title')
    ordering = ('-created_at',)

    def user_id(self, obj):
        return obj.user.id

admin.site.register(Genre)
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(Feedback)
admin.site.register(Interaction)
