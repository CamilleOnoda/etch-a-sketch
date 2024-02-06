function createGrid() {
    let gridSize = 256;

    let grid = document.querySelector('.grid');

    for (i = 0; i < gridSize - 1; i++) {
        let square = document.createElement('div');
        square.classList.add('squares');
        grid.appendChild(square);
//        create 60px box
    }
}

createGrid();