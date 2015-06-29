from django.views.generic import ListView, CreateView, UpdateView, DetailView, DeleteView
from django.core.urlresolvers import reverse
from django.shortcuts import redirect

from braces.views import LoginRequiredMixin
from TestYourProject.users.models import User
from .models import Project
from .forms import ProjectForm, ProjectUpdateForm


class ProjectListView(LoginRequiredMixin, ListView):
    model = Project
    slug_field = "name"
    slug_url_kwarg = "name"

    def get_context_data(self, **kwargs):
        context = super(ProjectListView, self).get_context_data(**kwargs)
        # Retrieve the users that match between
        # the current project for co_owners field
        dct_co_owners = User.objects.prefetch_related(
            "co_owners").filter(pk=self.request.user.pk)
        # Get the co_owners from the dict as a list
        lst_co_owners = [
            x["co_owners"] for x in dct_co_owners.values(
                "co_owners") if x["co_owners"]]

        lst_projects = list(
            Project.objects.filter(owner_id=self.request.user.pk))

        projects_co_owners = Project.objects.in_bulk(lst_co_owners)
        projects_co_owners = [x for _, x in projects_co_owners.items()]

        lst_projects = lst_projects + projects_co_owners

        context['project_list'] = lst_projects
        return context


class ProjectCreateView(LoginRequiredMixin, CreateView):

    model = Project
    form_class = ProjectForm

    def get_form(self, form_class):
        form = super(ProjectCreateView, self).get_form(form_class)
        form.fields['co_owners'].queryset = User.objects.exclude(
            username=self.request.user)
        return form

    def form_valid(self, form):
        project = form.save(commit=False)
        project.owner = self.request.user
        project.save()
        return redirect(self.get_success_url())

    def get_success_url(self):
        return reverse("projects:list")

    def get_object(self):
        return Project.objects.get(pk=self.object.pk)


class ProjectUpdateView(LoginRequiredMixin, UpdateView):
    model = Project
    form_class = ProjectUpdateForm

    def get_success_url(self):
        return reverse("projects:list")

    def get_object(self):
        return Project.objects.get(name=self.kwargs['name'])


class ProjectDetailView(LoginRequiredMixin, DetailView):
    model = Project

    slug_field = "name"
    slug_url_kwarg = "name"

    def get_context_data(self, **kwargs):
        context = super(ProjectDetailView, self).get_context_data(**kwargs)
        # Retrieve the users that match between
        # the current project for co_owners field
        dct_co_owners = Project.objects.prefetch_related(
            "co_owners__username").filter(pk=self.object.pk)
        # Get the co_owners from the dict as a list
        lst_co_owners = [
            x["co_owners__username"] for x in dct_co_owners.values(
                "co_owners__username") if x["co_owners__username"]]

        context['co_owners'] = lst_co_owners
        return context


class ProjectResultsView(ProjectDetailView):
    template_name = "Project/results.html"


class ProjectDeleteView(LoginRequiredMixin, DeleteView):
    model = Project

    slug_field = "name"
    slug_url_kwarg = "name"

    def get_success_url(self):
        return reverse("projects:list")
