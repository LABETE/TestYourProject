from django.views.generic import ListView, CreateView, UpdateView, DetailView, DeleteView
from django.core.urlresolvers import reverse

from .models import Case


class CaseListView(ListView):
    model = Case


class CaseCreateView(CreateView):
    model = Case

    fields = ("name", "description", "status", "start_date", "end_date")


class CaseUpdateView(UpdateView):
    model = Case

    def get_success_url(self):
        return reverse("case:detail",
                       kwargs={"pk": self.object.pk})


class CaseDetailView(DetailView):
    model = Case


class CaseResultsView(CaseDetailView):
    template_name = "case/results"


class CaseDeleteView(DeleteView):
    model = Case
