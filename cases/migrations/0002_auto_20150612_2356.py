# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cases', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='casemodel',
            old_name='defects_defect_id',
            new_name='defect_id',
        ),
        migrations.RemoveField(
            model_name='casemodel',
            name='projects_project_id',
        ),
        migrations.AddField(
            model_name='casemodel',
            name='defect_id_displayed',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='casemodel',
            name='project_id',
            field=models.IntegerField(default=0),
        ),
    ]
