import pytest

from doctors.models import Doctor
from mixer.backend.django import mixer


@pytest.mark.django_db()
class TestDoctor:
    def test_doctor_save(self) -> None:
        """It creates a doctor and creates a string representation"""
        doctor = mixer.blend(Doctor)
        assert doctor.pk == 1
        assert str(doctor) == f"{doctor.first_name} {doctor.last_name}"
