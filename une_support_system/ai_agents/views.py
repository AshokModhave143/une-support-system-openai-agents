from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import os

from ai_agents.agents.triage_agent import TriageAgent
from ai_agents.utils import get_or_create_eventloop, loopwaiting, setup_openai_key
from .serializers import AgentRequestSerializer
from agents import Agent, Runner, set_default_openai_key



# Set up the OpenAI key
setup_openai_key()

class OpenAIAgentView(APIView):
    def post(self, request):
        serializer = AgentRequestSerializer(data=request.data)

        if serializer.is_valid():
            message = serializer.validated_data.get("message")

            if not message:
                return Response(
                    {"error": "'message' key is missing in the request data."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            agent = TriageAgent()

            loop = get_or_create_eventloop()

            result = Runner.run_sync(agent, message)

            loop.run_until_complete(loopwaiting())

            return Response(
                {
                    "agentName": f"{result.last_agent.name}",
                    "response": result.final_output_as("json"),
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )


# Sample request - {"message": "hello"}
