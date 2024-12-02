# Generated by Django 4.2.15 on 2024-11-17 05:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('conversationID', models.AutoField(primary_key=True, serialize=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('messageContent', models.TextField()),
                ('messageTimestamp', models.DateTimeField(auto_now_add=True)),
                ('creatorID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_conversations', to=settings.AUTH_USER_MODEL)),
                ('participants', models.ManyToManyField(related_name='conversations', to=settings.AUTH_USER_MODEL)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='message_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
