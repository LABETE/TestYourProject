# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('defects', '0003_defectmodel_id_displayed'),
    ]

    operations = [
        migrations.CreateModel(
            name='Defect',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('start_date', models.DateTimeField(null=True, blank=True)),
                ('end_date', models.DateTimeField(null=True, blank=True)),
                ('status_defect', models.SmallIntegerField(default=1, choices=[(1, 'New'), (2, 'In Progress'), (3, 'Open'), (4, 'Closed'), (5, 'Deferred'), (6, 'Ready')])),
                ('id_displayed', models.IntegerField(default=0)),
                ('tracking', models.TextField(blank=True)),
                ('assigned', models.OneToOneField(to=settings.AUTH_USER_MODEL, blank=True, related_name='assigned')),
                ('owner', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Defects',
                'verbose_name': 'Defect',
            },
        ),
        migrations.RemoveField(
            model_name='defectmodel',
            name='assigned',
        ),
        migrations.RemoveField(
            model_name='defectmodel',
            name='owner',
        ),
        migrations.DeleteModel(
            name='DefectModel',
        ),
    ]
