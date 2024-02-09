

function createGrid() {
    let gridSize = 256; //16x16

    let grid = document.querySelector('.grid');

    for (i = 0; i < gridSize - 1; i++) {
        let square = document.createElement('div');
        square.classList.add('squares');
        grid.appendChild(square);
    };
};

function getSelectedPen(e) {
    let colorPen = document.querySelector('#colorPen');
    let selectedColorPen = e.currentTarget.value;
    console.log(selectedColorPen);
    colorPen.value = selectedColorPen;
    changeBackgroundPen(selectedColorPen);
};

function getSelectedBrush(e) {
    let colorBrush = document.querySelector('#colorBrush');
    let selectedcolorBrush = e.currentTarget.value;
    console.log(selectedcolorBrush);
    colorBrush.value = selectedcolorBrush;
    changeBackgroundBrush(selectedcolorBrush);
};

function mouseOverHandler(selectedcolorBrush) {
    return function(event) {
        event.target.style.backgroundColor = selectedcolorBrush;
    };
};

function changeBackgroundPen(selectedColorPen) {
    let gridSquares = document.querySelectorAll('.squares');
    gridSquares.forEach(square => {
        square.addEventListener('click', () => {
            console.log(selectedColorPen);
            square.style.backgroundColor = selectedColorPen;
        });
    });
};

function changeBackgroundBrush(selectedcolorBrush) {
    let gridSquares = document.querySelectorAll('.squares');
    let mouseOverListener = mouseOverHandler(selectedcolorBrush);

    gridSquares.forEach(square => {
        square.addEventListener('mouseover', mouseOverListener);
    });

    document.querySelector('.grid').addEventListener('click', () => {
        gridSquares.forEach(square => {
            square.removeEventListener('mouseover', mouseOverListener);
        });
    });
};

colorPen.addEventListener('input', getSelectedPen);
colorBrush.addEventListener('input', getSelectedBrush);
createGrid();
