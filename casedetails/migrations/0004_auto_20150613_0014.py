# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('casedetails', '0003_casedetailmodel_defect_id_displayed'),
    ]

    operations = [
        migrations.RenameField(
            model_name='casedetailmodel',
            old_name='cases_case_id',
            new_name='case_id',
        ),
    ]
