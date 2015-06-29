# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('casedetails', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='casedetailmodel',
            name='name',
        ),
        migrations.RemoveField(
            model_name='casedetailmodel',
            name='owner',
        ),
        migrations.AddField(
            model_name='casedetailmodel',
            name='input_data',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='casedetailmodel',
            name='output_data',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='casedetailmodel',
            name='description',
            field=models.TextField(),
        ),
    ]
