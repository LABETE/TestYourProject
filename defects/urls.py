from django.conf.urls import url

from . import views

urlpatterns = [
    """
    url(regex=r"^$", view=views.DefectListView.as_view(), name="list"),
    url(regex=r"^(?P<pk>\d+)/$",
        view=views.DefectDetailView.as_view(), name="detail"),
    url(regex=r"^(?P<pk>\d+)/results/$",
        view=views.DefectResultsView.as_view(), name="results"),
    url(regex=r"^/create/$",
        view=views.DefectCreateView.as_view(), name="create"),
    url(regex=r"^(?P<pk>\d+)/update/$",
        view=views.DefectUpdateView.as_view(), name="update"),
    url(regex=r"^(?P<pk>\d+)/delete/$",
        view=views.DefectDeleteView.as_view(), name="delete"),
    """
]
