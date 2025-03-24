
from agents import Agent
from ai_agents.agents.course_advisor_agent import CourseAdvisorAgent
from ai_agents.agents.english_agent import EnglishAgent
from ai_agents.agents.scheduling_assistant_agent import SchedulingAssistantAgent
from ai_agents.agents.spanish_agent import SpanishAgent
from ai_agents.agents.university_poet_agent import UniversityPoetAgent

agents_for_handoffs = [
    # SpanishAgent(), 
    # EnglishAgent(), 
    CourseAdvisorAgent(), 
    UniversityPoetAgent(), 
    SchedulingAssistantAgent()
]

class TriageAgent(Agent):
    def __init__(self):
        super().__init__(
            name="Triage agent",
            instructions="Handoff to the appropriate agent based speciality of agent",
            handoffs=agents_for_handoffs,
        )
