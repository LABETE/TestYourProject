from django.db import models
from django.core.urlresolvers import reverse

from core.models import GeneralData, TimeStamp
from projects.models import Status


class Case(GeneralData, Status, TimeStamp):
    """Case model get data from GeneralData model in core.models,
    TimeStamp model in core.models and Status model in
    project.models(abstract classes)"""
    project_id = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Case"
        verbose_name_plural = "Cases"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("cases:detail", kwargs={"name": self.name})
