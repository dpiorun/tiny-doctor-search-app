from django.urls import path

from doctors.views import DoctorView

urlpatterns = [
    path("doctors/", DoctorView.as_view(), name="doctors"),
]
