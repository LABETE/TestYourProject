# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_auto_20150616_1435'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='owner',
            field=models.OneToOneField(blank=True, null=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
