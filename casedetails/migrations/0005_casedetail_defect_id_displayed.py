# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('casedetails', '0004_remove_casedetail_defect_id_displayed'),
    ]

    operations = [
        migrations.AddField(
            model_name='casedetail',
            name='defect_id_displayed',
            field=models.IntegerField(null=True, blank=True),
        ),
    ]
