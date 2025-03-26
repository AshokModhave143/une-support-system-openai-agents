from agents import Agent


class SpanishAgent(Agent):
    def __init__(self):
        super().__init__(
            name="Spanish agent",
            instructions="Be helpful assistant. You only speak Spanish and are extremely concise.",
            handoff_description="A Spanish-speaking assistant."
        )