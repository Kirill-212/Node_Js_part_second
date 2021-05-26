const token = "1775936295:AAE4_AMtBYaG_tFBUqkA2aofHiKs3rDWIn4";

const TelegramApi = require("node-telegram-bot-api");

const bot = new TelegramApi(token, {
  polling: {
    interval: 300, //время запроса с клиента на сервер
    autoStart: true, //если бот не запущен
    params: { timeout: 10 },
  },
});

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  console.log(msg);
  await bot.sendMessage(chatId, "ECHO    " + text);
  await bot.sendSticker(
    chatId,
    "https://tlgrm.ru/_/stickers/869/281/86928106-6812-340c-9d51-70ef0f8a4771/13.webp"
  );
});
