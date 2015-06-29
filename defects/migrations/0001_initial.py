# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DefectModel',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('start_date', models.DateTimeField(null=True, blank=True)),
                ('end_date', models.DateTimeField(null=True, blank=True)),
                ('status_defect', models.SmallIntegerField(choices=[(1, 'New'), (2, 'In Progress'), (3, 'Open'), (4, 'Closed'), (5, 'Deferred'), (6, 'Ready')], default=1)),
                ('Tracking', models.TextField(blank=True)),
                ('assigned', models.OneToOneField(blank=True, related_name='assigned', to=settings.AUTH_USER_MODEL)),
                ('owner', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Defects',
                'verbose_name': 'Defect',
            },
        ),
    ]
