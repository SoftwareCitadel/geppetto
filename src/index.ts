import Geppetto from "./geppetto";
import { question, select } from "@topcli/prompts";

const requirements = await question("What are the requirements?");
const type = await select("What type of application?", {
  choices: ["webapp", "api"],
});

const geppetto = new Geppetto();
await geppetto.run(requirements, type as "webapp" | "api");
