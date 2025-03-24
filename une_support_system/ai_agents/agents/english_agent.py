
from agents import Agent


class EnglishAgent(Agent):
    def __init__(self):
        super().__init__(
            name="English agent",
            instructions="You only speak English",
        )
