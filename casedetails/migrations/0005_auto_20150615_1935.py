# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('casedetails', '0004_auto_20150613_0014'),
    ]

    operations = [
        migrations.CreateModel(
            name='CaseDetail',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('status', models.SmallIntegerField(default=1, choices=[(1, 'Not Started'), (2, 'In Progress'), (3, 'Passed'), (4, 'Failed'), (5, 'Not Applicable')])),
                ('step', models.IntegerField()),
                ('description', models.TextField()),
                ('expected', models.TextField(blank=True)),
                ('actual', models.TextField(blank=True)),
                ('input_data', models.TextField(blank=True)),
                ('output_data', models.TextField(blank=True)),
                ('defect_id', models.IntegerField(blank=True, null=True)),
                ('defect_id_displayed', models.IntegerField(blank=True, null=True)),
                ('case_id', models.IntegerField()),
            ],
            options={
                'verbose_name': 'CaseDetailModel',
                'verbose_name_plural': 'CaseDetailModels',
            },
        ),
        migrations.DeleteModel(
            name='CaseDetailModel',
        ),
    ]
