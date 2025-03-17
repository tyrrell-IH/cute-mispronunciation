import { CLI } from "../lib/cli.js";
import { Comment } from "../lib/comment.js";

const ui = new CLI();
const word = await ui.inputWord();
const comment = new Comment(word);
comment.exec();
