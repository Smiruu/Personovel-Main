# Generated by Django 4.2.8 on 2024-04-13 13:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0008_log'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPreferredGenre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.genre')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='preferred_genre', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
