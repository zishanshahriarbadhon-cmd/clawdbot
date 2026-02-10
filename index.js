const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const token = process.env.TELEGRAM_BOT_TOKEN;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if (!msg.text) return;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg.text);
    bot.sendMessage(chatId, result.response.text());
  } catch (e) {
    bot.sendMessage(chatId, "দুঃখিত, এখন উত্তর দিতে পারছি না। API Key ঠিক আছে কি না চেক করুন।");
  }
});
console.log("Bot is online!");
