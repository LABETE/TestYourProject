# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0008_auto_20150617_1841'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='projectcoowner',
            name='co_owners',
        ),
        migrations.AddField(
            model_name='project',
            name='co_owners',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL, blank=True, null=True, related_name='co_owners'),
        ),
        migrations.DeleteModel(
            name='ProjectCoOwner',
        ),
    ]
