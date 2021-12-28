const beginPage = document.querySelector("#begin");
const holes = document.getElementsByClassName("hole");
const start = document.getElementById("start");
const scoreText = document.getElementById("score");
const highnameText = document.getElementById("highname");
const highscoreText = document.getElementById("highscore");
const countBar = document.querySelector(".bar");
const second = document.querySelector("#second");

// 最高分
const high = { score: 0, name: "???" };
// 計分
let score = 0;
// 計時器
let timer = 0;

// 讀取資料:文字轉JSON
const storage = JSON.parse(localStorage.getItem("catchJerry"));
// 如果有資料
if (storage) {
  high.name = storage.name;
  high.score = storage.score;
  // 修改最高分顯示文字
  highnameText.innerText = high.name;
  highscoreText.innerText = high.score;
}

start.onclick = () => {
  beginPage.style.display = "none";
  // 停用開始按鈕
  start.disabled = true;
  // 重設分數
  score = 0;
  scoreText.innerText = score;
  // 每秒變換一次
  timer = setInterval(game, 1000);
  game();
  //三十秒後遊戲結束
  setTimeout(end, 30 * 1000);
  // timebar 啟用
  countBar.classList.add("animation");
  // 一秒後開始倒數
  count();
};
const game = () => {
  // 移除class
  for (const hole of holes) {
    hole.classList.remove("jerry");
    hole.classList.remove("catched");
    hole.classList.remove("trap");
    hole.classList.remove("wrongCatch");
  }
  //隨機抽三個不考慮重複，雙數出現Jerry，單數出現trap
  for (let i = 0; i < 3; i++) {
    const randomNum = Math.round(Math.random() * (holes.length - 1));
    if (randomNum % 2 === 0) {
      holes[randomNum].classList.add("jerry");
    } else {
      holes[randomNum].classList.add("trap");
    }
  }
};

// 寫入倒數數字
const count = () => {
  let num = 30;
  count30 = setInterval(() => {
    num--;
    second.innerHTML = num;
  }, 1000);
};

// 遊戲結束
const end = () => {
  // reset timebar
  countBar.classList.remove("animation");
  clearInterval(count30);
  second.innerHTML = 30;
  //停止變換
  clearInterval(timer);
  // 清除畫面上的東西
  for (const hole of holes) {
    hole.classList.remove("jerry");
    hole.classList.remove("catched");
    hole.classList.remove("trap");
    hole.classList.remove("wrongCatch");
  }
  // 啟用開始按鈕
  start.disabled = false;
  // 跳出訊息
  alert(`Game Over! You got ${score} points!`);
  // 紀錄最高分
  if (score > high.score) {
    // 請玩家輸入名字
    const input = prompt("Excellent! Please enter your name");
    // 修改最高分變數資料
    high.score = score;
    // 短路求值 會回傳第一個true的值
    high.name = input || "???";
    // 修改最高分數顯示文字
    highnameText.innerText = high.name;
    highscoreText.innerText = high.score;
    // 保存
    //localStorage.setItem(資料名，文字)
    // 變數轉文字:JSON.stringify(變數)
    localStorage.setItem("catchJerry", JSON.stringify(high));
  }
  beginPage.style.display = "block";
};
// 點擊換圖
for (const hole of holes) {
  // 如果打到Jerry加分打到trap扣分
  hole.onclick = () => {
    if (hole.classList.contains("jerry")) {
      // 變為生氣Jerry
      hole.classList.replace("jerry", "catched");
      // 加分
      score++;
      scoreText.innerText = score;
    } else if (hole.classList.contains("trap")) {
      // 變為生氣Jerry
      hole.classList.replace("trap", "wrongCatch");
      // 扣分
      score--;
      scoreText.innerText = score;
    }
  };
}
