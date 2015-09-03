from django.db.models import Q

from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView

from .models import Defect
from projects.models import Project
from .serializers import DefectSerializer


class DefectCreateListView(ListCreateAPIView):

    """DefectCreateListView use the ListCreateAPIView from
    the rest_framework library for create entries and retrieve
    the queryset list of defects in the rest api. Use the DefectSerializer
    class from defects.serializers"""
    serializer_class = DefectSerializer
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
        # Get all the defects
        defects = Defect.objects.all()
        # List comprehesion for return the defect when the defect.project_id is
        # equals to the project ids in the projects list
        # (return the defects related to the user projects)
        return [defect for project in projects for defect in defects if project == defect.project_id]


class DefectReadUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    """DefectReadUpdateDeleteView use the RetrieveUpdateDestroyAPIView from
    the rest_framework library for retrieve an entry, update the entry and
    delete the entry in the rest api, use the DefectSerializer class
    from defects.serializers"""
    queryset = Defect.objects.all()
    serializer_class = DefectSerializer
    lookup_field = "id"
