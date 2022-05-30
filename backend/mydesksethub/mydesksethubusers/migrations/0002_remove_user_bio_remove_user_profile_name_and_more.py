# Generated by Django 4.0.4 on 2022-05-28 21:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mydesksethubusers', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='bio',
        ),
        migrations.RemoveField(
            model_name='user',
            name='profile_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='profile_pic',
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('occupation', models.CharField(blank=True, max_length=100, null=True)),
                ('bio', models.TextField(blank=True, null=True)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profile_pictures')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]