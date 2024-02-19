import OpenAI from "openai";
import Pino from "pino";
import PinoPretty from "pino-pretty";
import GeppettoAiFunctions from "./geppetto_ai_functions";
import AdonisFramework from "./frameworks/adonis/adonis_framework";

export default class Geppetto {
  #openai = new OpenAI();
  #logger = Pino(PinoPretty());
  #framework = AdonisFramework;

  async run(prompt: string) {
    const functions = {
      ...GeppettoAiFunctions.functions,
      ...this.#framework.functions,
    };

    const example = await new this.#framework().loadExample();

    const runner = this.#openai.beta.chat.completions
      .runTools({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are Geppetto, a 10x developer who can develop entire full-stack fully-functioning applications in seconds, with extra care.
              You should not comment what you are doing, but you should do it with the highest quality possible.
              Also, feel free to ask the user for any additional information you need.
              You are asked to develop a completely usable ${
                this.#framework.name
              } application following the client's requirements.
              Here is the example codebase you should use as a starting point: ${JSON.stringify(
                example,
                null,
                2
              )}.
              All the code should be completely functional and production-ready.
              You are given the following mission:`,
          },
          { role: "user", content: prompt },
        ],
        tools: Object.values(functions).map((f) => ({
          type: "function",
          function: {
            function: f.function,
            description: f.description,
            parse: JSON.parse,
            parameters: f.parameters,
          },
        })) as any,
      })
      .on("message", (message) => {
        this.#logger.info(message);
      });
    const finalContent = await runner.finalContent();
    console.log(finalContent);
  }
}
