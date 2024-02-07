function createGrid() {
    let gridSize = 256; //16x16

    let grid = document.querySelector('.grid');

    for (i = 0; i < gridSize - 1; i++) {
        let square = document.createElement('div');
        square.classList.add('squares');
        grid.appendChild(square);
    }
};

function getSelectedColor(e) {
    let colorPicker = document.querySelector('#colorPicker');
    let selectedColor = e.currentTarget.value;
    colorPicker.value = selectedColor;
    changeBackgroundColor(selectedColor);
};

function changeBackgroundColor(selectedColor) {
    let gridSquares = document.querySelectorAll('.squares');
    gridSquares.forEach(square => {
        square.addEventListener('click', () => {
            console.log(selectedColor);
            square.style.backgroundColor = selectedColor;
        });
    });
};

colorPicker.addEventListener('input', getSelectedColor);
createGrid();
