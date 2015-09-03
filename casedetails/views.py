from django.db.models import Q

from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView

from .models import CaseDetail
from projects.models import Project
from cases.models import Case
from .serializers import CaseDetailSerializer


class CaseDetailCreateListView(ListCreateAPIView):

    """CaseDetailCreateListView use the ListCreateAPIView from
    the rest_framework library for create entries and retrieve
    the queryset list of casedetails in the rest api. Use the
    CaseDetailSerializer class from casedetails.serializers"""
    queryset = CaseDetail.objects.all()
    serializer_class = CaseDetailSerializer
    lookup_field = "id"

    def get_queryset(self):
        # Get the data from the current user making the request
        user = self.request.user
        # Return only projects when the current user is the owner
        # or is a coowner of the project
        projects = Project.objects.filter(
            Q(co_owners=user) | Q(owner=user)).distinct()
        # List comprehesion for get the id of each project in the projects list
        projects = [project.id for project in projects]
        # Get all the cases
        cases = Case.objects.all()
        # List comprehesion for get the id of each case in the cases list
        cases = [
            case.id for project in projects for case in cases if project == case.project_id]
        # Get all the casedetails
        casedetails = CaseDetail.objects.all().order_by('step')
        # List comprehesion for return the casedetail when the
        # casedetail.casei_id is equals to the case ids in the
        # cases list (return the casedetails related to the user projects)
        return [casedetail for case in cases for casedetail in casedetails if case == casedetail.case_id]


class CaseDetailReadUpdateDeleteView(RetrieveUpdateDestroyAPIView):

    """CaseDetailReadUpdateDeleteView use the RetrieveUpdateDestroyAPIView from
    the rest_framework library for retrieve an entry, update the entry and
    delete the entry in the rest api, use the ProjectSerializer class
    from casedetails.serializers"""
    queryset = CaseDetail.objects.all()
    serializer_class = CaseDetailSerializer
    lookup_field = "id"
