from django.db import models
from django.core.urlresolvers import reverse

from projects.models import Status


class CaseDetail(Status):
    """CaseDetail model get data from Status model in
    project.models(abstract class)"""
    step = models.IntegerField()
    expected = models.TextField(blank=True)
    actual = models.TextField(blank=True)
    input_data = models.TextField(blank=True)
    output_data = models.TextField(blank=True)
    defect_id = models.IntegerField(
        null=True, blank=True)
    defect_id_displayed = models.IntegerField(
        null=True, blank=True)
    case_id = models.IntegerField()

    class Meta:
        verbose_name = "CaseDetailModel"
        verbose_name_plural = "CaseDetailModels"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("casedetails:detail", kwargs={"step": self.step})
