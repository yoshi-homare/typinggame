'use strict';

{
  // 配列をランダムに表示されるようtargetIDに挿入。
  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    loc = 0;
  }

  const words = [
    "uni",
    "tukuyo",
    "ginta",
    "sakura",
    "tomomi",
  ];
  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false;
  const target = document.getElementById("target");

  // ブラウザ画面にクリックイベントを付与しゲームが始まるよう設定し始まったらクリックできないように設定。クリックした時刻も取得。
  document.addEventListener("click", () => {
    if (isPlaying === true) {
      return;
    }

    isPlaying = true;
    startTime = Date.now();
    setWord();
  });

  // ブラウザ画面にキーダウンイベントを付与し正解なら正解部を＿に変えつつ進み間違っていたら何も起きないよう設定。
  document.addEventListener("keydown", e => {
    if (e.key !== word[loc]) {
      return;
    }
    loc++;
    target.textContent = "_".repeat(loc) + word.substring(loc);

    //単語を最後まで打ったら次の単語に進むように設定し単語全て終わったらresultIDに経過時間を挿入。
    if (loc === word.length) {
      if (words.length === 0) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const result = document.getElementById("result");
        result.textContent = `おわり！${elapsedTime}秒！!`
        return;
      }

      setWord();
    }
  });
}