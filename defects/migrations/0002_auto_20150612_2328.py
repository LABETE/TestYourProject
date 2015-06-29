# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('defects', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='defectmodel',
            old_name='Tracking',
            new_name='tracking',
        ),
    ]
