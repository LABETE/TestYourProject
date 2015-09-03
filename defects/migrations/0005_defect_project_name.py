# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('defects', '0004_auto_20150824_2041'),
    ]

    operations = [
        migrations.AddField(
            model_name='defect',
            name='project_name',
            field=models.CharField(max_length=200, blank=True, null=True),
        ),
    ]
