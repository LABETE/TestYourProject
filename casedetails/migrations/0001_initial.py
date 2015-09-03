# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CaseDetail',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('status', models.SmallIntegerField(choices=[(1, 'Not Started'), (2, 'In Progress'), (3, 'Passed'), (4, 'Failed'), (5, 'Not Applicable')], default=1)),
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
    ]
