from rest_framework import filters
from rest_framework.generics import ListAPIView

from doctors.models import Doctor
from doctors.serializers import DoctorsSerializer


class DoctorView(ListAPIView):
    """
    Get a list of doctors.
    """

    queryset = Doctor.objects.all()
    serializer_class = DoctorsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["city", "facility", "area_of_expertise"]
