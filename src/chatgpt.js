import { OpenAI } from "openai";
import config from "config";

const CHATGPT_MODEL = "gpt-3.5-turbo";
const ROLES = {
  ASSISTANT: "assistant", //отвечает за ответы самого чата
  SYSTEM: "system", // системное знаение которо воспринимает сам чатгпт но оно не отопражается в переписке
  USER: "user", // то что отправляем мы
};

const openai = new OpenAI({
  apiKey: config.get("OPENAI_KEY"),
});

const getMessage = (m) => {
  return `напиши на основе этих тезисов последовательную эмоциональную историю: ${m}
    Эти тезисы с описанием ключевых моментов дня.
    Необходимо в итоге получить такую историю, что бы я запомнил этот день 
    и смог в последствии рассказать ее друзьям.
   Много текста не нужно, главное , чтобы были эмоции, правильная последовательность + учтение контекста
    `;
};

export async function chatGPT(message = "") {
  const messages = [
    {
      role: ROLES.SYSTEM,
      content:
        "Ты опытный копирайтер, который пишет краткие эмоциональные статьи для соц сетей.",
    },
    {
      role: ROLES.USER,
      content: getMessage(message),
    },
  ];
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages,
      model: CHATGPT_MODEL,
    });
    return chatCompletion.choices[0].message;
  } catch (error) {
    console.error("Error while chat completion", error.message);
  }
}
