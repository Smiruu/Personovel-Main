# Generated by Django 5.0 on 2024-02-16 07:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_remove_interaction_chapters'),
    ]

    operations = [
        migrations.AddField(
            model_name='interaction',
            name='chapters',
            field=models.FileField(default=1, upload_to='chapters'),
            preserve_default=False,
        ),
    ]