from django.db import models

# Create your models here.
class AiAgentsRequest(models.Model):
    session_id = models.CharField(max_length=100, default="default_session")
    message = models.CharField(max_length=300)

    def __str__(self):
        return f"Session: {self.session_id}, Message: {self.message}"