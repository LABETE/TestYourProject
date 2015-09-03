# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('defects', '0002_auto_20150812_1701'),
    ]

    operations = [
        migrations.AddField(
            model_name='defect',
            name='project_id',
            field=models.IntegerField(default=0),
        ),
    ]
