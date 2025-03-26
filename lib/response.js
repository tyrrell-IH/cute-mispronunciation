import Mispronunciation from "./mispronunciation.js";
import ResponseArt from "./responseArt.js";

export default class Response {
  #word;

  constructor(word) {
    this.#word = word;
  }

  exec() {
    if (this.#isHiraganaOnly(this.#word)) {
      const mispronunciation = new Mispronunciation(this.#word);
      const mispronunciationWord = mispronunciation.create();
      const responseArt = new ResponseArt(mispronunciationWord);
      console.log(responseArt.speechBubble());
      console.log(responseArt.normalFace());
    } else {
      const confusedWord = "？　？　？";
      const responseArt = new ResponseArt(confusedWord);
      console.log(responseArt.speechBubble());
      console.log(responseArt.confusedFace());
    }
  }

  #isHiraganaOnly(word) {
    return /^[\p{sc=Hiragana}ー]+$/u.test(word);
  }
}
