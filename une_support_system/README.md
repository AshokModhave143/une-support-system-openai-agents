# UNE University Support System

The UNE Support System is a web-based application designed to provide support to university students. It features a chat interface where students can interact with AI agents for assistance. The system is built using a Django REST framework backend and a React frontend, with OpenAI-powered agents for intelligent responses.

---

## Features

- **Chat Interface**: Students can send messages and receive responses from AI agents.
- **AI Agents**: OpenAI-powered agents that provide intelligent and context-aware responses.
- **Multi-Agent Support**: Includes agents for different languages (e.g., English and Spanish).
- **Real-Time Updates**: Messages are displayed dynamically in the chat interface.

---

## Tech Stack

### Backend

- **Django**: Python-based web framework for building the backend.
- **Django REST Framework**: For building RESTful APIs.
- **OpenAI Agents**: For AI-powered responses. Used `openai-agents-python` library.
- **SQLite**: Lightweight database for development.

### Frontend

- **React**: JavaScript library for building the user interface.
- **TypeScript**: For type-safe development.
- **SCSS**: For styling components.
- **Vite**: Fast development server and build tool.

---

## Getting Started

### Prerequisites

- **Backend**:
  - Python 3.10+
  - Virtual environment (e.g., `venv`)
- **Frontend**:
  - Node.js 18+
  - npm 9+

---

## Setup Instructions

> For demostration purpose, there is default one user is set up as logged in student `John Doe` and all messages will be sent by him

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/AshokModhave143/une-support-system-openai-agents.git
   cd une-support-system
   ```

2. Create a virtual environment and activate it:

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up the `.env` file:

   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in the required environment variables (e.g.`DJANGO_SECRET_KEY`, `OPENAI_API_KEY`).

5. Apply database migrations:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Start the backend server:
   ```bash
   python manage.py runserver
   ```
   The application will start at `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the .env file:

   - Ensure the `VITE_API_BASE_URL` in .env points to the backend server (e.g., `http://127.0.0.1:8000`).

4. Start the frontend development server:

   ```bash
   npm start
   ```

5. Open the application in your browser:
   ```
   http://localhost:5173
   ```

---

## Running the Project

1. Start the backend server:

   ```bash
   python manage.py runserver
   ```

2. Start the frontend server:

   ```bash
   npm start
   ```

3. Access the application at `http://localhost:5173`.

---

## Testing

> Note: No tests written for backend and frontend

### Backend Tests

1. Run Django tests:
   ```bash
   python manage.py test
   ```

### Frontend Tests

- Add test scripts to the frontend directory as needed.
- Run tests using:
  ```bash
  npm test
  ```

---

## Project Structure

### Backend

- **ai_agents**: Contains models, serializers, views, and agent logic.
- **une_support_system**: Core Django project files.

### Frontend

- **`src/components/`**: React components for the UI.
- **`src/context/`**: Context API for managing global state.
- **`src/api/`**: API services for interacting with the backend.

---
