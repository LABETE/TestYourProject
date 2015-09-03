from django.db import models
from django.conf import settings
from core.models import GeneralData, TimeStamp
from django.utils.translation import ugettext_lazy as _
from django.core.urlresolvers import reverse


STATUS_NEW = 1
STATUS_IN_PROGRESS = 2
STATUS_OPEN = 3
STATUS_CLOSED = 4
STATUS_DEFERRED = 5
STATUS_READY = 6

STATUS_DEFECT_CHOICES = (
    (STATUS_NEW, _("New")),
    (STATUS_IN_PROGRESS, _("In Progress")),
    (STATUS_OPEN, _("Open")),
    (STATUS_CLOSED, _("Closed")),
    (STATUS_DEFERRED, _("Deferred")),
    (STATUS_READY, _("Ready")),
)


class StatusDefect(models.Model):

    """Abstract class Model for Defect Model"""
    status_defect = models.SmallIntegerField(
        choices=STATUS_DEFECT_CHOICES, default=STATUS_NEW)

    class Meta:
        abstract = True
        verbose_name = "StatusDefectModel"
        verbose_name_plural = "StatusDefectModels"

    def __str__(self):
        self.choices


class Defect(GeneralData, StatusDefect, TimeStamp):

    """Defect model get data from GeneralData model in core.models,
    TimeStamp model in core.models and StatusDefect model in
    defects.models(abstract classes)"""
    id_displayed = models.IntegerField(default=0)
    tracking = models.TextField(blank=True)
    assigned = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="assigned")
    project_id = models.IntegerField(default=0)
    project_name = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        verbose_name = "Defect"
        verbose_name_plural = "Defects"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("defects:detail", kwargs={"name": self.name})
