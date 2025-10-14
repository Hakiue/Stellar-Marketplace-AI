import axios from "axios";

const N8N_BASE_URL = import.meta.env.VITE_N8N_BASE_URL || 'http://localhost:5678'; // Test URL provided

async function callN8n(intent, data) {
  try {
    const response = await axios.post(`${N8N_BASE_URL}/webhook-test/stellar-ai`, {
      intent,
      ...data
    });
    return response.data.reply;
  } catch (error) {
    console.error('n8n API error:', error);
    // Fallback to mock if n8n is unavailable
    return getMockReply(intent, data);
  }
}

function getMockReply(intent, data) {
  if (intent === 'describe_product') {
    const { productName = 'product', category = 'general' } = data;
    const templates = [
      `Introducing the ${productName}, your go-to ${category} item that redefines excellence and style.`,
      `Unleash the potential of the ${productName}, a ${category} essential that brings joy to every moment.`,
      `Experience the magic of the ${productName}, crafted for ${category} lovers seeking unparalleled quality.`,
      `Step into the future with the ${productName}, a ${category} revolution that's fun, functional, and fabulous.`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  } else if (intent === 'chat') {
    return 'Sorry, the assistant is currently unavailable. Please try again later.';
  }
  return 'Mock reply';
}

export async function generateProductDescription(name, category, wallet) {
  const intent = 'description';
  const data = { name, category, wallet };
  return await callN8n(intent, data);
}

export async function chatReply(message, wallet) {
  const intent = 'chat';
  const data = { message, wallet };
  return await callN8n(intent, data);
}
