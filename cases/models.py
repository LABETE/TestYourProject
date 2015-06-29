from django.db import models

from core.models import GeneralData, TimeStamp
from projects.models import Status


class Case(GeneralData, Status, TimeStamp):

    project_id = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Case"
        verbose_name_plural = "Cases"

    def __str__(self):
        return self.name
