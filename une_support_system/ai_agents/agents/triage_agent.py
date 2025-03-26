
from agents import Agent, function_tool
from ai_agents.agents.course_advisor_agent import CourseAdvisorAgent
from ai_agents.agents.english_agent import EnglishAgent
from ai_agents.agents.scheduling_assistant_agent import SchedulingAssistantAgent
from ai_agents.agents.spanish_agent import SpanishAgent
from ai_agents.agents.university_poet_agent import UniversityPoetAgent

agents_for_handoffs = [
    CourseAdvisorAgent(), 
    UniversityPoetAgent(), 
    SchedulingAssistantAgent(),
    SpanishAgent(), 
    EnglishAgent(), 
]

@function_tool
def get_topic_list():
    print("Getting topic list")
    return [
        "1. Course advisor",
        "2. University poet",
        "3. Scheduling assistant",
        "4. Spanish agent",
        "5. English agent",
        ]

class TriageAgent(Agent):
    def __init__(self):
        super().__init__(
            name="Triage agent",
            instructions="Handoff to the appropriate agent based speciality of agent",
            handoffs=agents_for_handoffs,
            tools=[get_topic_list]
        )

    def reset_context(self):
        """Reset the context for the agent."""
        self.context = ""

    def determine_agent(self, query):
        """Determine the appropriate agent based on the query."""
        if "schedule" in query.lower():
            return SchedulingAssistantAgent()
        elif "course" in query.lower() or "advisor" in query.lower():
            return CourseAdvisorAgent()
        elif "poem" in query.lower() or "poet" in query.lower():
            return UniversityPoetAgent()
        else:
            return None  # Default to no handoff