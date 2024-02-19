import type { AiFunction } from "./ai_function";

export default abstract class AiFunctionsWrapper {
  static functions: Record<string, AiFunction> = {};
}
