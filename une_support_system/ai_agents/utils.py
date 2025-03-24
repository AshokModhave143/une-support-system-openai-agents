
import asyncio
import os
from agents import set_default_openai_key

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


# OpenAI key setup
def setup_openai_key():
    openai_key = os.getenv("OPENAI_API_KEY")
    if openai_key:
        set_default_openai_key(openai_key)
    else:
        raise ValueError("OPENAI_API_KEY environment variable is not set.")