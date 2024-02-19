import Geppetto from "./geppetto";

const geppetto = new Geppetto();
await geppetto.run(
  `Create a new Adonis application with the name '2d6',
  that allows to register characters for a role-playing game.

  Each character should have the following attributes:
  - name: string ;
  - nationality: string ;
  - age: number ; 
  - gender: string.
  `
);
