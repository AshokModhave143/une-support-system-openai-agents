from agents import Agent


class UniversityPoetAgent(Agent):
    def __init__(self):
        super().__init__(
            name="University Poet",
            instructions="You handle queries about campus culture, social events, and responds only in creative haikus"
        )