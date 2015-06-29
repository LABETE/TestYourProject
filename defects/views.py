from django.views.generic import ListView, CreateView, UpdateView, DetailView, DeleteView
from django.core.urlresolvers import reverse

from .models import Defect


class DefectListView(ListView):
    model = Defect


class DefectCreateView(CreateView):
    model = Defect

    fields = ("id_displayed", "name", "description", "status_defect",
              "start_date", "end_date", "assigned", "tracking")


class DefectUpdateView(UpdateView):
    model = Defect

    def get_success_url(self):
        return reverse("defect:detail",
                       kwargs={"pk": self.object.pk})


class DefectDetailView(DetailView):
    model = Defect


class DefectResultsView(DefectDetailView):
    template_name = "defect/results.html"


class DefectDeleteView(DeleteView):
    model = Defect
