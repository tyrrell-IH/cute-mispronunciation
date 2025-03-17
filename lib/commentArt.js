export class CommentArt {
  constructor(comment) {
    this.comment = comment;
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
              ⌜￣￣${"￣".repeat(this.comment.length)}￣￣⌝
                   ${this.comment}   
              ⌞  ＿${"＿".repeat(this.comment.length)}＿＿⌟
              ｜／
    `;
  }
}
