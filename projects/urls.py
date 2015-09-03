from django.conf.urls import url

from . import views

urlpatterns = [
    """url(regex=r"^$", view=views.ProjectListView.as_view(), name='list'),
    url(regex=r"^create/$",
        view=views.ProjectCreateView.as_view(), name="create"),
    url(regex=r"^(?P<name>[\w]+)/update/$",
        view=views.ProjectUpdateView.as_view(), name="update"),
    url(regex=r"^(?P<name>[\w]+)/$",
        view=views.ProjectDetailView.as_view(), name="detail"),
    url(regex=r"^(?P<name>\d+)/results/$",
        view=views.ProjectResultsView.as_view(), name="results"),
    url(regex=r"^(?P<name>[\w]+)/delete/$",
        view=views.ProjectDeleteView.as_view(), name="delete"),"""
]
