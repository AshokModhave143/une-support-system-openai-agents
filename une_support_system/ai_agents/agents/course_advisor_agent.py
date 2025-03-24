
from agents import Agent


class CourseAdvisorAgent(Agent):
    def __init__(self):
        super().__init__(
            name="Course Advisor", 
            instructions="You handle questions related to course recommendations. Speaks in a helpful, informative tone."
        )