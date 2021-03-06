from django.db import models
from django.conf import settings


class GeneralData(models.Model):

    """Generic abstract class for call in other models"""
    owner = models.ForeignKey(settings.AUTH_USER_MODEL)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    class Meta:
        abstract = True
        verbose_name = "GeneralData"
        verbose_name_plural = "GeneralDatas"

    def __str__(self):

        return self.name


class TimeStamp(models.Model):

    """Generic abstract class for call in other models"""
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    class Meta:
        abstract = True
        verbose_name = "TimeStampModel"
        verbose_name_plural = "TimeStampModels"

    def __str__(self):
        return self.created
