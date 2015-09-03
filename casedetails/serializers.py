from rest_framework import serializers

from .models import CaseDetail


class CaseDetailSerializer(serializers.ModelSerializer):

    """CaseDetailSerializer use the CaseDetail Model"""
    class Meta:
        model = CaseDetail
        # Fields displayed on the rest api for casedetails
        fields = (
            "id", "step", "expected", "actual", "input_data",
            "output_data", "defect_id", "defect_id_displayed",
            "case_id", "status",)
