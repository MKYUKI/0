//node public/js/test-openai-updated.js
const axios = require('axios');

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("Error: OPENAI_API_KEY is not set.");
  process.exit(1);
}

// text-davinci-002（あるいは、推奨されるモデル）を利用
axios.post('https://api.openai.com/v1/completions', {
  model: "text-davinci-002",
  prompt: "Hello, world!",
  max_tokens: 5,
}, {
  headers: {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  }
})
.then(response => {
  console.log("OpenAI API Response:", response.data);
})
.catch(error => {
  console.error("Error calling OpenAI API:", error.response ? error.response.data : error.message);
});