# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('defects', '0002_auto_20150612_2328'),
    ]

    operations = [
        migrations.AddField(
            model_name='defectmodel',
            name='id_displayed',
            field=models.IntegerField(default=0),
        ),
    ]
