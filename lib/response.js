import { Mispronunciation } from "./mispronunciation.js";
import { CommentArt } from "./commentArt.js";

export class Response {
  #word;

  constructor(word) {
    this.#word = word;
  }

  #isHiraganaOnly(word) {
    return /^[\p{sc=Hiragana}ー]+$/u.test(word);
  }

  exec() {
    if (this.#isHiraganaOnly(this.#word)) {
      const mispronunciation = new Mispronunciation(this.#word);
      const mispronunciationComment = mispronunciation.create();
      const commentArt = new CommentArt(mispronunciationComment);
      console.log(commentArt.speechBubble());
      console.log(commentArt.normalFace());
    } else {
      const confusedComment = "？？？";
      const commentArt = new CommentArt(confusedComment);
      console.log(commentArt.speechBubble());
      console.log(commentArt.confusedFace());
    }
  }
}
