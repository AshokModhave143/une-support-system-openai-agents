from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import os

from ai_agents.agents.triage_agent import TriageAgent
from ai_agents.models import AiAgentsRequest
from ai_agents.utils import get_or_create_eventloop, loopwaiting, setup_openai_key
from .serializers import AgentRequestSerializer
from agents import Agent, Runner, set_default_openai_key


# Set up the OpenAI key
setup_openai_key()

# Initialize the TriageAgent object once
triage_agent = TriageAgent()

class OpenAIAgentView(APIView):
    def post(self, request):
        serializer = AgentRequestSerializer(data=request.data)

        if serializer.is_valid():
            session_id = serializer.validated_data.get("session_id")
            message = serializer.validated_data.get("message")

            if not session_id or not message:
                return Response(
                    {"error": "'session_id' or 'message' key is missing in the request data."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Save current message to database
            AiAgentsRequest.objects.create(session_id=session_id, message=message)

            # Retrieve conversation history for session
            conversation_history = AiAgentsRequest.objects.filter(session_id=session_id).order_by("id")

            # Combine messages into a single context string
            context = "\n".join([f"User: {msg.message}" for msg in conversation_history])

            loop = get_or_create_eventloop()

            # Reset the triage agent's context for each query
            triage_agent.reset_context()

             # Dynamically determine the appropriate agent
            selected_agent = triage_agent.determine_agent(message)

            if selected_agent:
                # Use the selected agent for the query
                result = Runner.run_sync(selected_agent, f"{context}\nUser: {message}")
                agent_name = selected_agent.name
            else:
                # Use the triage agent if no specific agent is determined
                result = Runner.run_sync(triage_agent, f"User: Greet user. Be concise. {message}. Can you get me list of topics you help with?")
                agent_name = triage_agent.name


            loop.run_until_complete(loopwaiting())

            return Response(
                {
                    "agentName": agent_name,
                    "response": result.final_output_as("json"),
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )


# Sample request - {"session_id": "session_1234", "message": "hello"}
