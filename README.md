# Gemini AI Chatbot

This project is a simple yet powerful web-based chatbot that integrates with Google's Gemini AI (specifically the `gemini-1.5-flash` model) to provide dynamic, human-like responses. It was built as the final capstone project for the "Maju Bareng AI" training program by Hacktiv8.

The frontend is built with vanilla HTML, CSS, and JavaScript, and the backend is a Node.js server using the Express framework.

## Features

-   **Dynamic AI Responses**: No hardcoded replies. All bot responses are generated in real-time by the Gemini 1.5 Flash model.
-   **Live Chat Simulation**: A clean user interface that displays a real-time conversation flow.
-   **Asynchronous Communication**: Uses the Fetch API on the frontend to communicate with the backend without page reloads.
-   **Clear UI**: User messages appear on the right, and bot responses on the left.
-   **Loading Indicator**: A "Gemini is thinking..." message appears while waiting for the AI to respond.
-   **Scalable**: The code is structured to be easily extendable, for example, to support multimodal inputs in the future.

## Prerequisites

-   **Node.js**: Version 18 or higher (e.g., v23.7.0).
-   **Google Cloud Account**: A Google Cloud project with the Gemini API enabled.
-   **Gemini API Key**: You must have a valid API key to use the service.
-   **VS Code** (or any other code editor).

## Setup and Installation

Follow these steps to get the project running on your local machine.

1.  **Clone the Repository**:
    ```bash
    git clone <your-github-repository-url>
    cd gemini-chatbot-api
    ```

2.  **Install Dependencies**:
    This will install Express, the Google Generative AI SDK, dotenv, and cors.
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**:
    Create a `.env` file in the root directory of the project by copying the example file.
    ```bash
    cp .env.example .env
    ```
    Open the newly created `.env` file and replace `your_key_here` with your actual Gemini API Key.
    ```
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

4.  **Run the Server**:
    Start the backend server using the npm start script.
    ```bash
    npm start
    ```

5.  **Access the Application**:
    The server will be running on `http://localhost:3000`. Open this URL in your web browser to start chatting with the Gemini AI Chatbot.

## How to Test

1.  Navigate to `http://localhost:3000`.
2.  Type a message in the input field at the bottom of the page (e.g., "Hello, how can Gemini help me today?").
3.  Press "Send" or hit Enter.
4.  Your message will appear on the right side of the chat box.
5.  A "Gemini is thinking..." placeholder will appear on the left.
6.  Once the AI responds, the placeholder will be replaced with Gemini's actual message.
7.  Verify that the responses are dynamic and not hardcoded.

## Submission Notes

This project is ready to be pushed to a GitHub repository. The `.gitignore` file is configured to exclude `node_modules` and the `.env` file, which is a security best practice. To submit:

1.  Initialize a new Git repository: `git init`
2.  Add all files: `git add .`
3.  Commit the files: `git commit -m "Initial commit of Gemini AI Chatbot"`
4.  Add your remote repository: `git remote add origin <your-github-repo-url>`
5.  Push to GitHub: `git push -u origin main`
