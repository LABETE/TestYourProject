from django.db.models import Q

from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .models import Project
from .serializers import ProjectSerializer


class ProjectCreateListView(ListCreateAPIView):

    """ProjectCreateListView use the ListCreateAPIView from
    the rest_framework library for create entries and retrieve
    the queryset list of projects in the rest api. Use the
    ProjectSerializer class from projects.serializers"""
    serializer_class = ProjectSerializer
    lookup_field = 'id'

    def get_queryset(self):
        # Get the data from the current user making the request
        user = self.request.user
        # Return only projects when the current user is the owner
        # or is a coowner of the project
        return Project.objects.filter(
            Q(owner=user) | Q(co_owners=user)).distinct().order_by('name')


class ProjectReadUpdateDeleteView(RetrieveUpdateDestroyAPIView):

    """ProjectReadUpdateDeleteView use the RetrieveUpdateDestroyAPIView from
    the rest_framework library for retrieve an entry, update the entry and
    delete the entry in the rest api, use the ProjectSerializer class
    from projects.serializers"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'id'
