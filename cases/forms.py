from django import forms
from .models import Case


class CaseForm(forms.ModelForm):

    class Meta:
        model = Case
        fields = (
            "name", "owner", "description",
            "start_date", "end_date", "project_id")
