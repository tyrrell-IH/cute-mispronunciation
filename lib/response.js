import { Mispronunciation } from "./mispronunciation.js";

export class Response {
  #word;

  constructor(word) {
    this.#word = word;
  }

  #isHiraganaOnly(word) {
    return /^[\p{sc=Hiragana}ー]+$/u.test(word);
  }

  createWord() {
    if (this.#isHiraganaOnly(this.#word)) {
      const mispronunciation = new Mispronunciation(this.#word);
      return mispronunciation.create();
    } else {
      return "？？？";
    }
  }
}
