# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0007_auto_20150617_1642'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectCoOwner',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('project_id', models.IntegerField(default=0)),
                ('co_owners', models.ForeignKey(to=settings.AUTH_USER_MODEL, blank=True, null=True, related_name='co_owners')),
            ],
        ),
        migrations.RemoveField(
            model_name='project',
            name='co_owners',
        ),
        migrations.AlterField(
            model_name='project',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
