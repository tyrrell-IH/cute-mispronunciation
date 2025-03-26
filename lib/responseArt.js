export default class ResponseArt {
  constructor(word) {
    this.word = word;
  }

  normalFace() {
    return `
          ＿＿y＿＿＿＿
       ／              ＼ 
       ／  ＿＿＿／＼＿＿へ）
       (／   ー     ー    ｜
      Ｃ       ●     ●     ＼
       ｜       ＿＿       ｜
        ＼     /＿＼      ／
           ーーーーーー
    `;
  }

  confusedFace() {
    return `
          ＿＿y＿＿＿＿
        ／              ＼ 
       ／  ＿＿＿／＼＿＿へ）
       (／   ／     ＼   ｜
      Ｃ      ●    ●      ＼
       ｜                 ｜
        ＼       ＾      ／
           ーーーーーー
    `;
  }

  speechBubble() {
    return `
              ⌜￣￣${"￣".repeat(this.word.length)}￣￣⌝
                   ${this.word}
              ⌞  ＿${"＿".repeat(this.word.length)}＿＿⌟
              ｜／
    `;
  }
}
