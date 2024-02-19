import Geppetto from "./geppetto";

const requirements = prompt("Describe your project requirements:");
if (requirements === null) {
  console.error("Please provide a description of your project requirements");
  process.exit(1);
}

const geppetto = new Geppetto();
await geppetto.run(requirements);
