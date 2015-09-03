from django import forms
from .models import Defect


class DefectForm(forms.ModelForm):

    class Meta:
        model = Defect
        fields = ("name", "description", "owner", "start_date",
                  "end_date", "tracking", "assigned",)
