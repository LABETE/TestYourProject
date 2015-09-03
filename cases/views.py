from django.db.models import Q

from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .models import Case
from projects.models import Project
from .serializers import CaseSerializer


class CaseCreateListView(ListCreateAPIView):

    """CaseCreateListView use the ListCreateAPIView from
    the rest_framework library for create entries and retrieve
    the queryset list of cases in the rest api. Use the CaseSerializer
    class from cases.serializers"""
    serializer_class = CaseSerializer
    lookup_field = "id"

    def get_queryset(self):
        # Get the data from the current user making the request
        user = self.request.user
        # Return only projects when the current user is the owner
        # or is a coowner of the project
        projects = Project.objects.filter(
            Q(co_owners=user) | Q(owner=user)).distinct()
        # List comprehesion for get the id of each project in the list
        projects = [project.id for project in projects]
        # Get all the cases
        cases = Case.objects.all()
        # List comprehesion for return the case when the case.project_id is
        # equals to the project ids in the projects list
        # (return the cases related to the user projects)
        return [case for project in projects for case in cases if project == case.project_id]


class CaseReadUpdateDeleteView(RetrieveUpdateDestroyAPIView):

    """CaseReadUpdateDeleteView use the RetrieveUpdateDestroyAPIView from
    the rest_framework library for retrieve an entry, update the entry and
    delete the entry in the rest api, use the CaseSerializer class
    from cases.serializers"""
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    lookup_field = "id"
