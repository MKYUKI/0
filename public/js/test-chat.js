//node public/js/test-chat.js
const axios = require('axios');

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("Error: OPENAI_API_KEY is not set.");
  process.exit(1);
}

axios.post('https://api.openai.com/v1/chat/completions', {
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello, world!" }
  ],
  max_tokens: 50,
}, {
  headers: {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  }
})
.then(response => {
  console.log("Chat API Response:", response.data);
})
.catch(error => {
  console.error("Error calling Chat API:", error.response ? error.response.data : error.message);
});