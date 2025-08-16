document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    // Store chat history
    let chatHistory = [];

    // Function to append a message to the chat box
    const appendMessage = (role, content) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', role);

        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('message-bubble');
        bubbleDiv.textContent = content;

        messageDiv.appendChild(bubbleDiv);
        chatBox.appendChild(messageDiv);

        // Auto-scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    // Function to show "thinking" indicator
    const showThinkingIndicator = () => {
        const thinkingDiv = document.createElement('div');
        thinkingDiv.classList.add('message', 'bot');
        thinkingDiv.id = 'thinking-indicator'; // Give it an ID to find and remove it later

        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('message-bubble', 'thinking');
        bubbleDiv.textContent = 'Gemini is thinking...';

        thinkingDiv.appendChild(bubbleDiv);
        chatBox.appendChild(thinkingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    // Function to remove "thinking" indicator
    const removeThinkingIndicator = () => {
        const indicator = document.getElementById('thinking-indicator');
        if (indicator) {
            indicator.remove();
        }
    };

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        const userMessage = userInput.value.trim();
        if (!userMessage) {
            return; // Don't send empty messages
        }

        // 1. Display user's message
        appendMessage('user', userMessage);

        // 2. Add user message to history
        chatHistory.push({ role: 'user', content: userMessage });

        // 3. Clear the input field
        userInput.value = '';

        // 4. Show a thinking indicator
        showThinkingIndicator();

        try {
            // 5. Send chat history to the backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: chatHistory }), // Sending the whole history for context
            });

            // Remove the thinking indicator once we get a response
            removeThinkingIndicator();

            if (!response.ok) {
                // If response is not OK, display an error message
                appendMessage('bot', 'Sorry, failed to get a response from the server.');
                console.error('Server error:', response.status, response.statusText);
                return;
            }

            const data = await response.json();
            const botResponse = data.result;

            // 6. Display Gemini's response
            if (botResponse) {
                appendMessage('bot', botResponse);
                // 7. Add bot response to history
                chatHistory.push({ role: 'bot', content: botResponse });
            } else {
                appendMessage('bot', 'Sorry, no response was received.');
            }

        } catch (error) {
            removeThinkingIndicator();
            console.error('Error fetching response:', error);
            appendMessage('bot', 'Sorry, an error occurred while trying to connect to the server.');
        }
    });
});