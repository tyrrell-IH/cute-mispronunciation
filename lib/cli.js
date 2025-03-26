import enquire from "enquirer";

export default class CLI {
  async inputWord() {
    const input = await enquire.prompt({
      type: "input",
      name: "word",
      message: "Enter the word in Hiragana.",
    });
    return input.word;
  }
}
