import { Telegraf } from "telegraf";
import config from "config";
import { message } from "telegraf/filters";
import { chatGPT } from "./chatgpt.js";
import { create } from "./notion.js";
import { Loader } from "./loader.js";

const bot = new Telegraf(config.get("TELEGRAM_TOKEN"), {
  handlerTimeout: Infinity,
});

bot.command("start", (ctx) => {
  ctx.reply("Привет");
});

bot.on(message("text"), async (ctx) => {
  try {
    const text = ctx.message.text;
    if (!text.trim()) ctx.reply("Текст не может быть пустым");

    const loader = new Loader(ctx);
    loader.show();

    const response = await chatGPT(text);

    if (!response) return ctx.reply("Ошибка с API", response);

    const notionResponse = await create(text, response.content);
    loader.hide();

    ctx.reply(`ваша страница: ${notionResponse.url}`);
  } catch (error) {
    console.log("error while proccessing text:", error.message);
  }
}); //слушатель событий который понимает только текс

bot.launch();
