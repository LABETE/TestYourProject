from django.conf.urls import url

from TestYourProject.users import views as user_views
from projects import views as project_views
from cases import views as case_views
from casedetails import views as casedetail_views
from defects import views as defect_views

"""api.py contain the urls that are linked to the rest api"""
urlpatterns = [
    url(regex=r"^users/$",
        view=user_views.UserCreateListView.as_view(),
        name='user_rest_api'),
    url(regex=r"^users/(?P<username>[-\w]+)/$",
        view=user_views.UserReadUpdateDeleteView.as_view(),
        name='user_rest_api'),
    url(regex=r"^projects/$",
        view=project_views.ProjectCreateListView.as_view(),
        name='project_rest_api'),
    url(regex=r"^projects/(?P<id>[-\d]+)/$",
        view=project_views.
        ProjectReadUpdateDeleteView.as_view(),
        name='project_rest_api'),
    url(regex=r"^cases/$",
        view=case_views.CaseCreateListView.as_view(),
        name='case_rest_api'),
    url(regex=r"^cases/(?P<id>[-\d]+)/$",
        view=case_views.CaseReadUpdateDeleteView.as_view(),
        name='case_rest_api'),
    url(regex=r"^casedetails/$",
        view=casedetail_views.
        CaseDetailCreateListView.as_view(),
        name='casedetail_rest_api'),
    url(regex=r"^casedetails/(?P<id>[-\d]+)/$",
        view=casedetail_views.
        CaseDetailReadUpdateDeleteView.as_view(),
        name='casedetail_rest_api'),
    url(regex=r"^defects/$",
        view=defect_views.DefectCreateListView.as_view(),
        name='defect_rest_api'),
    url(regex=r"^defects/(?P<id>[-\d]+)/$",
        view=defect_views.
        DefectReadUpdateDeleteView.as_view(),
        name='defect_rest_api'),
]
