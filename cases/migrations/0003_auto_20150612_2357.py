# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cases', '0002_auto_20150612_2356'),
    ]

    operations = [
        migrations.RenameField(
            model_name='casemodel',
            old_name='casedetails_step_defect_id',
            new_name='step_defect_id',
        ),
    ]
