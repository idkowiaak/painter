const bigBox = document.querySelector(".big-box");

for (let i = 0; i < 1225; i++) {
  const button = document.createElement("button");
  button.classList.add("box");
  bigBox.appendChild(button);
}

let currentColor = "#e74c3c";

const savedState = JSON.parse(localStorage.getItem("painterState"));
if (savedState) {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box, index) => {
    if (savedState[index]) {
      box.style.backgroundColor = savedState[index];
      box.classList.add("active");
    }
  });
}

document
  .querySelector(".red")
  .addEventListener("click", () => (currentColor = "#e74c3c"));
document
  .querySelector(".blue")
  .addEventListener("click", () => (currentColor = "#3498db"));
document
  .querySelector(".green")
  .addEventListener("click", () => (currentColor = "#2ecc71"));

bigBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("box")) {
    const box = e.target;
    if (box.classList.contains("active")) {
      box.classList.remove("active");
      box.style.backgroundColor = "transparent";
    } else {
      box.classList.add("active");
      box.style.backgroundColor = currentColor;
    }
    saveState();
  }
});

const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", () => {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.classList.remove("active");
    box.style.backgroundColor = "transparent";
  });
  saveState();
});

function saveState() {
  const boxes = document.querySelectorAll(".box");
  const state = Array.from(boxes).map((box) =>
    box.classList.contains("active") ? box.style.backgroundColor : null
  );
  localStorage.setItem("painterState", JSON.stringify(state));
}
