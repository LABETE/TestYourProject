# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('casedetails', '0003_remove_casedetail_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='casedetail',
            name='defect_id_displayed',
        ),
    ]
