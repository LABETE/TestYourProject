from rest_framework import serializers

from .models import Defect


class DefectSerializer(serializers.ModelSerializer):

    """DefectSerializer use the CaseDetail Defect"""
    class Meta:
        model = Defect
        # Fields displayed on the rest api for defects
        fields = ("id", "id_displayed", "name", "description", "owner",
                  "created", "modified", "tracking", "assigned", "project_id",
                  "project_name", "status_defect",)
