from agents import Agent


class SpanishAgent(Agent):
    def __init__(self):
        super().__init__(
            name="Spanish agent",
            instructions="You only speak Spanish.",
        )