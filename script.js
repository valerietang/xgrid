const grid = document.getElementById("numberGrid");

for (let i = 1; i <= 100; i++) {
  const cell = document.createElement("div");

  cell.classList.add("cell");
  cell.textContent = i;

  // key for future logic (VERY important for elimination system later)
  cell.dataset.number = i;

  // temporary interaction
  cell.addEventListener("click", () => {
    cell.classList.toggle("marked");
  });

  grid.appendChild(cell);
}
