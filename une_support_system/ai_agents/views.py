from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import os
from .serializers import AgentRequestSerializer
from agents import Agent, Runner, set_default_openai_key
import asyncio


# OpenAI setup
api_key = os.getenv("OPENAI_API_KEY")

if api_key:
    set_default_openai_key(api_key)
else:
    raise ValueError("OPENAI_API_KEY is not set.")


# Event loop set up
def get_or_create_eventloop():
    try:
        return asyncio.get_event_loop()
    except RuntimeError as ex:
        if "There is no current event loop in thread" in str(ex):
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            return asyncio.get_event_loop()
        else:
            raise ex


async def loopwaiting():
    await asyncio.sleep(1)


class SpanishAgent(Agent):
    def __init__(self):
        super().__init__(
            name="Spanish agent",
            instructions="You only speak Spanish.",
        )


class EnglishAgent(Agent):
    def __init__(self):
        super().__init__(
            name="English agent",
            instructions="You only speak English",
        )


class TriageAgent(Agent):
    def __init__(self):
        super().__init__(
            name="Triage agent",
            instructions="Handoff to the appropriate agent based on the language of the request.",
            handoffs=[SpanishAgent(), EnglishAgent()],
        )


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
