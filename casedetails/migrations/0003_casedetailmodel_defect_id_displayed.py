# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('casedetails', '0002_auto_20150612_2335'),
    ]

    operations = [
        migrations.AddField(
            model_name='casedetailmodel',
            name='defect_id_displayed',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
