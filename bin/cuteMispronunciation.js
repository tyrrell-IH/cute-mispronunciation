import { CLI } from "../lib/cli.js";
import { Comment } from "../lib/comment.js";

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
const comment = new Comment(word);
comment.exec();
