from rest_framework import serializers

from .models import Case


class CaseSerializer(serializers.ModelSerializer):

    """CaseSerializer use the Case Model"""
    class Meta:
        model = Case
        # Fields displayed on the rest api for cases
        fields = ("id", "name", "owner", "description",
                  "start_date", "end_date", "created", "modified",
                  "project_id", "status",)
