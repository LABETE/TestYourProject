# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_auto_20150812_1745'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='co_owners',
            field=models.ManyToManyField(related_name='co_owners', blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
