# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('casedetails', '0002_auto_20150826_1641'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='casedetail',
            name='description',
        ),
    ]
