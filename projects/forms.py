from django import forms
from .models import Project


class ProjectForm(forms.ModelForm):

    class Meta:
        model = Project
        fields = (
            "name", "description",
            "start_date", "end_date", "co_owners")


class ProjectUpdateForm(ProjectForm):

    class Meta:
        model = Project
        fields = (
            "name", "owner", "description",
            "start_date", "end_date", "co_owners")
