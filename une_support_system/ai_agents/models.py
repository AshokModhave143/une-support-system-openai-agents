from django.db import models

# Create your models here.
class AiAgentsRequest(models.Model):
    message = models.CharField(max_length=300)

    def __str__(self):
        return self.message