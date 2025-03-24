from rest_framework import serializers
from .models import AiAgentsRequest


class AgentRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AiAgentsRequest
        fields = ["message"]
