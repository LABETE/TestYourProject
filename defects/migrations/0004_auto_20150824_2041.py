# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('defects', '0003_defect_project_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='defect',
            name='assigned',
            field=models.ForeignKey(related_name='assigned', to=settings.AUTH_USER_MODEL),
        ),
    ]
