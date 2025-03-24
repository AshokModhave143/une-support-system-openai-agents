from django.urls import path
from .views import OpenAIAgentView

urlpatterns = [
    path("agent/", OpenAIAgentView.as_view(), name="agent_view"),
]
