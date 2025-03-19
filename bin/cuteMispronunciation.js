import { CLI } from "../lib/cli.js";
import { Response } from "../lib/response.js";

const ui = new CLI();
let word;
try {
  word = await ui.inputWord();
} catch (error) {
  if (error === "") {
    process.exit(1);
  } else {
    throw error;
  }
}
const response = new Response(word);
response.exec();
