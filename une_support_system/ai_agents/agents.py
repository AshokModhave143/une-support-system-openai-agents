import json
from agents import Agent, Runner

class EchoAgent(Agent):
    def __init__(self):
        super().__init__("echo_agent")

    async def run(self, input_text):
        agent = Agent(
        name="Assistant",
            instructions="You only respond in haikus.",
        )

        result = await Runner.run(agent, "Tell me about recursion in programming.")
        print(json.dumps(result))

        return {"response": json.dumps(result)}