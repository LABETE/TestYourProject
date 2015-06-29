# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cases', '0003_auto_20150612_2357'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='casemodel',
            name='defect_id',
        ),
        migrations.RemoveField(
            model_name='casemodel',
            name='defect_id_displayed',
        ),
        migrations.RemoveField(
            model_name='casemodel',
            name='step_defect_id',
        ),
    ]
