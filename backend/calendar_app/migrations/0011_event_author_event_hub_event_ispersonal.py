# Generated by Django 4.2.12 on 2024-10-28 08:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hubs', '0003_hub_pending_members'),
        ('calendar_app', '0010_remove_event_date_alter_event_end_time_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='author',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='hub',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='hubs.hub'),
        ),
        migrations.AddField(
            model_name='event',
            name='isPersonal',
            field=models.BooleanField(default=True),
        ),
    ]
