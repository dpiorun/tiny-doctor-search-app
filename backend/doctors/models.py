from django.db import models

from django.db import models


class Doctor(models.Model):
    class AreaOfExpertise(models.TextChoices):
        ALLERGY_AND_IMMUNOLOGY = "Allergy and Immunology"
        ANESTHESIOLOGY = "Anesthesiology"
        COLON_AND_RECTAL_SURGERY = "Colon and Rectal Surgery"
        DERMATOLOGY = "Dermatology"
        EMERGENCY_MEDICINE = "Emergency Medicine"

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    city = models.CharField(max_length=50)
    area_of_expertise = models.CharField(
        max_length=254, choices=AreaOfExpertise.choices
    )
    facility = models.CharField(max_length=254)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        ordering = ["id"]
