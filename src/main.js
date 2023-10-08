import { Telegraf } from "telegraf";
import config from "config";
import { message } from "telegraf/filters";

const bot = new Telegraf(config.get("TELEGRAM_TOKEN"), {
  handlerTimeout: Infinity,
});

bot.command("start", (ctx) => {
  ctx.reply("Привет");
});

bot.on(message("text"), (ctx) => {
  ctx.reply("test");
}); //слушатель событий который понимает только текс

bot.launch();
