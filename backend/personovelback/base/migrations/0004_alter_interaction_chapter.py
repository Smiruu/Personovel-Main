# Generated by Django 4.2.8 on 2024-03-30 06:52

import base.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='interaction',
            name='chapter',
            field=models.FileField(blank=True, null=True, upload_to=base.models.upload_chapter_path),
        ),
    ]
