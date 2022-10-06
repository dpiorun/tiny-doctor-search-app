import pytest
from django.urls import reverse
from django.core.handlers.wsgi import WSGIRequest
from rest_framework.status import HTTP_200_OK
from rest_framework.test import APIRequestFactory, APIClient

from mixer.backend.django import mixer

from doctors.views import DoctorView
from doctors.models import Doctor

DOCTORS_LIST_API_URL = reverse("doctors")


@pytest.fixture()
def request_factory() -> APIRequestFactory:
    return APIRequestFactory()


@pytest.mark.django_db()
class TestDoctorView:
    def test_view(self, request_factory: APIRequestFactory) -> None:
        req = request_factory.get(DOCTORS_LIST_API_URL)
        response = DoctorView.as_view()(req)
        assert response.status_code == HTTP_200_OK

    @pytest.mark.parametrize(
        "search_params", ("", "Paris", "berlin,allergy", "Berlin,DRK")
    )
    def test_search(
        self, request_factory: APIRequestFactory, search_params: str
    ) -> None:
        """It should make a search, case insensitive, partial search possible"""
        mixer.blend(
            Doctor,
            city="Berlin",
            area_of_expertise="Allergy and Immunology",
            facility="Charité – Universitätsmedizin Berlin",
        )
        mixer.blend(
            Doctor,
            city="Berlin",
            area_of_expertise="Allergy and Immunology",
            facility="DRK Kliniken",
        )
        mixer.cycle(3).blend(
            "doctors.Doctor", city=(name for name in ("Paris", "London", "Warsaw"))
        )

        url = DOCTORS_LIST_API_URL + f"?search={search_params}"
        req = request_factory.get(url)
        response = DoctorView.as_view()(req)

        assert response.status_code == HTTP_200_OK
        if search_params == "":
            assert response.data["count"] == 5
        elif search_params == "Paris":
            assert response.data["count"] == 1
        elif search_params == "berlin,allergy":
            assert response.data["count"] == 2
        elif search_params == "Berlin,DRK":
            assert response.data["count"] == 1
