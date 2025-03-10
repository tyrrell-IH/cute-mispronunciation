import enquire from "enquirer";

export class CLI {
  async inputWord() {
    const input = await enquire.prompt({
      type: "input",
      name: "word",
      message: "簡単な単語をひらがなで入力してください",
    });
    return input.word;
  }
}
