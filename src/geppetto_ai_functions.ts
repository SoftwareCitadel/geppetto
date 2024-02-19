import AiFunction from "./ai_function_decorator";
import AiFunctionsWrapper from "./ai_functions_wrapper";

export default class GeppettoAiFunctions extends AiFunctionsWrapper {
  @AiFunction("Ask additional questions to the user", {
    type: "object",
    properties: { questions: { type: "array", items: { type: "string" } } },
  })
  static async askAdditionalQuestions({ questions }: { questions: string[] }) {
    return {
      answers: questions.map((q) => {
        return prompt(q);
      }),
    };
  }

  @AiFunction("Ask the user to confirm something", {
    type: "object",
    properties: { question: { type: "string" } },
  })
  static async confirm({ question }: { question: string }) {
    return {
      answer: confirm(question),
    };
  }

  @AiFunction("Ask the user for satisfaction", {
    type: "object",
    properties: { question: { type: "string" } },
  })
  static async askForSatisfaction({ question }: { question: string }) {
    return {
      satisfaction: prompt(question),
    };
  }
}
