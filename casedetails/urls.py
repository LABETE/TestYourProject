from django.conf.urls import url

from . import views

urlpatterns = [
    """
    url(regex=r"^$", view=views.CaseDetailListView.as_view(), name="list"),
    url(regex=r"^(?P<pk>\d+)/$",
        view=views.CaseDetailDetailView.as_view(), name="detail"),
    url(regex=r"^(?P<pk>\d+)/results/$",
        view=views.CaseDetailResultsView.as_view(), name="results"),
    url(regex=r"^/create/$",
        view=views.CaseDetailCreateView.as_view(), name="create"),
    url(regex=r"^(?P<pk>\d+)/update/$",
        view=views.CaseDetailUpdateView.as_view(), name="update"),
    url(regex=r"^(?P<pk>\d+)/delete/$",
        view=views.CaseDetailDetailView.as_view(), name="delete"),
    """
]
