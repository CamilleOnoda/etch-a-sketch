function GetGridSize() {
    const slideValue = document.querySelector("span");
    const inputSlider = document.querySelector("#size-range");

    inputSlider.oninput = () => {
        let value = inputSlider.value;
        slideValue.textContent = value;
        createGrid(value);
            };

        function createGrid(value) {
            let grid = document.querySelector('.grid');
            let gridWidth = grid.offsetWidth;
            let squareSize = Math.floor(gridWidth / value);
            let numberOfSquares = value * value;

            grid.textContent = "";

            for (let i = 0; i < numberOfSquares; i++) {
                let square = document.createElement('div');
                square.classList.add('squares');

                if((i + 1) % value === 0) {
                    square.style.width = squareSize + "px";
                } else {
                    square.style.width = squareSize +"px";
                }
            grid.appendChild(square);
            }
        }
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


function clickHandler(selectedColorPen) {
    return function(event) {
        event.target.style.backgroundColor = selectedColorPen;
    };
};


function changeBackgroundPen(selectedColorPen) {
    let gridSquares = document.querySelectorAll('.squares');
    let clickListener = clickHandler(selectedColorPen);

    gridSquares.forEach(square => {
        square.addEventListener('click', clickListener);
    });

    document.querySelector('.grid').addEventListener('dblclick', (event) => {
        gridSquares.forEach(square => {
            square.removeEventListener('click', clickListener);
            event.target.style.backgroundColor = "";
        });
    });
};


function changeBackgroundBrush(selectedcolorBrush) {
    let gridSquares = document.querySelectorAll('.squares');
    let isPainting = false;

    function startPaint() {
        isPainting = true;
    };

    function endPaint() {
        isPainting = false;
    };

    function handlePaint(square) {
        return function() {
            if(isPainting) {
                square.style.backgroundColor = selectedcolorBrush;
            }
        };
    }

    gridSquares.forEach(square => {
        square.addEventListener('mousedown', startPaint);
        square.addEventListener('mouseup', endPaint);
        square.addEventListener('mouseover', handlePaint(square));
    });

    document.addEventListener('mouseup', endPaint);
}


function erase() {
    let gridSquares = document.querySelectorAll('.squares');
    let isErasing = false;

    function startErase() {
        isErasing = true;
    };

    function endErase() {
        isErasing = false;
    };

    function handleErase(square) {
        return function () {
            if(isErasing) {
                console.log('is erasing')
                square.style.backgroundColor = "";
            }
        };
    }

    gridSquares.forEach(square => {
        square.addEventListener('mousedown', startErase);
        square.addEventListener('mouseup', endErase);
        square.addEventListener('mouseover', handleErase(square));
    });
    
    document.addEventListener('mouseup', endErase);
}


function restart() {
        location.reload();
};


colorPen.addEventListener('input', getSelectedPen);
colorBrush.addEventListener('input', getSelectedBrush);
restartButton.addEventListener('click', restart);

let eraser = document.querySelector('#eraser');
eraser.addEventListener('click', erase);

GetGridSize();
