from django.views.generic import ListView, CreateView, UpdateView, DetailView, DeleteView
from django.core.urlresolvers import reverse

from .models import CaseDetail


class CaseDetailListView(ListView):
    model = CaseDetail


class CaseDetailCreateView(CreateView):
    model = CaseDetail

    fields = ("step", "description", "expected", "actual",
              "input_data", "output_data", "defect_id_displayed")


class CaseDetailUpdateView(UpdateView):
    model = CaseDetail

    def get_success_url(self):
        return reverse("casedetail:detail",
                       kwargs={"pk": self.object.pk})


class CaseDetailDetailView(DetailView):
    model = CaseDetail


class CaseDetailResultsView(CaseDetailDetailView):
    template_name = "casedetail/results.html"


class CaseDetailDeleteView(DeleteView):
    model = CaseDetail
