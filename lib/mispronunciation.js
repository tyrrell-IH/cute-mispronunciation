export class Mispronunciation {
  #givenWord;

  constructor(word) {
    this.#givenWord = word;
  }

  create() {
    return this.#givenWord;
  }
}
