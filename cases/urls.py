from django.conf.urls import url

from . import views

urlpatterns = [
    """
    url(regex=r"^$", view=views.CaseListView.as_view(), name="list"),
    url(regex=r"^(?P<pk>\d+)/$",
        view=views.CaseDetailView.as_view(), name="detail"),
    url(regex=r"^(?P<pk>\d+)/results/$",
        view=views.CaseResultsView.as_view(), name="results"),
    url(regex=r"^/create/$",
        view=views.CaseCreateView.as_view(), name="create"),
    url(regex=r"^(?P<pk>\d+)/update/$",
        view=views.CaseUpdateView.as_view(), name="update"),
    url(regex=r"^(?P<pk>\d+)/delete/$",
        view=views.CaseDeleteView.as_view(), name="delete"),
    """
]
