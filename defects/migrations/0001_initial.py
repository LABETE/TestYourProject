# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Defect',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('start_date', models.DateField(blank=True, null=True)),
                ('end_date', models.DateField(blank=True, null=True)),
                ('status_defect', models.SmallIntegerField(choices=[(1, 'New'), (2, 'In Progress'), (3, 'Open'), (4, 'Closed'), (5, 'Deferred'), (6, 'Ready')], default=1)),
                ('id_displayed', models.IntegerField(default=0)),
                ('tracking', models.TextField(blank=True)),
            ],
            options={
                'verbose_name': 'Defect',
                'verbose_name_plural': 'Defects',
            },
        ),
    ]
