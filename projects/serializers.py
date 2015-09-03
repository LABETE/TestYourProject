from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):

    """ProjectSerializer use the Project Model"""
    class Meta:
        model = Project
        # Fields displayed on the rest api for projects
        fields = (
            "id", "name", "owner", "description",
            "start_date", "end_date", "created", "modified",
            "co_owners", "status",)
