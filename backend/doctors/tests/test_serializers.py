import pytest

from doctors.models import Doctor
from doctors.serializers import DoctorsSerializer


@pytest.fixture(scope="module")
def doctor_keys():
    return [
        "id",
        "first_name",
        "last_name",
        "email",
        "city",
        "area_of_expertise",
        "facility",
    ]


@pytest.fixture(scope="module")
def doctor_data():
    return {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "test@email.com",
        "city": "Test city",
        "area_of_expertise": 1,
        "facility": "Test facility",
    }


@pytest.fixture()
def doctor(doctor_data):
    doctor, _ = Doctor.objects.get_or_create(
        first_name=doctor_data.get("first_name"),
        last_name=doctor_data.get("last_name"),
        email=doctor_data.get("email"),
        city=doctor_data.get("city"),
        area_of_expertise=doctor_data.get("area_of_expertise"),
        facility=doctor_data.get("facility"),
    )
    yield doctor


@pytest.mark.django_db()
class TestDoctorsSerializer:
    def test_serializer(
        self, doctor: Doctor, doctor_data: Doctor, doctor_keys: list
    ) -> None:
        serializer = DoctorsSerializer(instance=doctor)
        data = serializer.data
        assert set(data.keys()) == set(doctor_keys)
        for key in doctor_keys:
            assert data[key] == doctor_data[key]
