const grid = document.getElementById("numberGrid");

// create 1–100 cells
for (let i = 1; i <= 100; i++) {
  const cell = document.createElement("div");
  
  cell.classList.add("cell");
  cell.textContent = i;

  // IMPORTANT: makes each cell addressable later
  cell.dataset.number = i;

  // placeholder interaction (you can remove later)
  cell.addEventListener("click", () => {
    cell.classList.toggle("marked");
  });

  grid.appendChild(cell);
}
