# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('defects', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='defect',
            name='assigned',
            field=models.OneToOneField(to=settings.AUTH_USER_MODEL, related_name='assigned', blank=True),
        ),
        migrations.AddField(
            model_name='defect',
            name='owner',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
    ]
