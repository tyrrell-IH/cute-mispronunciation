export class Mispronunciation {
  #word;

  constructor(word) {
    this.#word = word;
  }

  create() {
    return this.#word;
  }
}
