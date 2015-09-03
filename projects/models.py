from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from django.core.urlresolvers import reverse
from core.models import GeneralData, TimeStamp


STATUS_TODO = 1
STATUS_IN_PROGRESS = 2
STATUS_PASSED = 3
STATUS_FAILED = 4
STATUS_NOT_APPLICABLE = 5

STATUS_CHOICES = (
    (STATUS_TODO, _("Not Started")),
    (STATUS_IN_PROGRESS, _("In Progress")),
    (STATUS_PASSED, _("Passed")),
    (STATUS_FAILED, _("Failed")),
    (STATUS_NOT_APPLICABLE, _("Not Applicable")),
)


class Status(models.Model):

    """Generic status class model used in projects, cases
    and casedetails models"""
    status = models.SmallIntegerField(
        choices=STATUS_CHOICES, default=STATUS_TODO)

    class Meta:
        abstract = True
        verbose_name = "StatusCaseModel"
        verbose_name_plural = "StatusCaseModels"

    def __str__(self):
        return self.choices


class Project(GeneralData, TimeStamp, Status):

    """Project model get data from GeneralData model in core.models,
    TimeStamp model in core.models and Status model in
    project.models(abstract classes)"""
    co_owners = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="co_owners",
        blank=True, null=True)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):

        return self.name

    def get_absolute_url(self):
        return reverse("projects:detail", kwargs={"name": self.name})
