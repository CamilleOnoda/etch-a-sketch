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
    colorPen.value = selectedColorPen;
    changeBackgroundPen(selectedColorPen);
};


function getSelectedBrush(e) {
    let colorBrush = document.querySelector('#colorBrush');
    let selectedcolorBrush = e.currentTarget.value;
    colorBrush.value = selectedcolorBrush;
    changeBackgroundBrush(selectedcolorBrush);
};


function changeBackgroundPen(selectedColorPen) {
    let gridSquares = document.querySelectorAll('.squares');

    function clickHandler(selectedColorPen) {
        return function(event) {
            event.target.style.backgroundColor = selectedColorPen;
        };
    }

    let clickListener = clickHandler(selectedColorPen);
    
    gridSquares.forEach(square => {
        square.addEventListener('click', clickListener);
    });
}


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


function handleRandomColor(event) {
    const gridSquares = document.querySelectorAll('.squares');
    let buttonClicked = event.target;

    gridSquares.forEach(square => {
        square.removeEventListener('click', square.clickListener);
    });

    if(buttonClicked.id === 'darkerColor') {
        gridSquares.forEach(square => {
            let currentColor = square.style.backgroundColor;
            square.addEventListener('click', function () {
                let darkenedColor = darkenColor(currentColor, 10);
                square.style.backgroundColor = darkenedColor;
                currentColor = darkenedColor;
            });
        });
    } else if(buttonClicked.id === 'brighterColor') {
        gridSquares.forEach(square => {
            let currentColor = square.style.backgroundColor;
            square.addEventListener('click', function () {
                let brightenedColor = brightenColor(currentColor, 10);
                square.style.backgroundColor = brightenedColor;
                currentColor = brightenedColor;
            });
        });
    } else if(buttonClicked.id === 'randomSquare') {
        gridSquares.forEach(square => {
            square.addEventListener('click', function() {
                square.style.backgroundColor = randomRgbColor();
            });
        });
    } else {
        gridSquares.forEach(square => {
            square.style.backgroundColor = randomRgbColor();
        });
    }
}


function randomRgbColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


function erasePen() {
    let gridSquares = document.querySelectorAll('.squares');
        gridSquares.forEach(square => {
            square.addEventListener('dblclick', () => {
                square.style.backgroundColor = "white";
            });
        });
}


function eraseClickandDrag() {
    const gridSquares = document.querySelectorAll('.squares');
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


function darkenColor(color, percent) {
    const components = color.substring(4, color.length - 1).split(',').map(Number);
    const [r, g, b] = components;
    const darkerR = Math.max(0, Math.floor(r * (1 - percent / 100)));
    const darkerG = Math.max(0, Math.floor(g * (1 - percent / 100)));
    const darkerB = Math.max(0, Math.floor(b * (1 - percent / 100)));
    return `rgb(${darkerR}, ${darkerG}, ${darkerB})`;
}


function brightenColor(color, percent) {
    const components = color.substring(4, color.length - 1).split(',').map(Number);
    const [r, g, b] = components;
    const brighterR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    const brighterG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    const brighterB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
    return `rgb(${brighterR}, ${brighterG}, ${brighterB})`;
}


function restart() {
        location.reload();
};


colorPen.addEventListener('input', getSelectedPen);
colorBrush.addEventListener('input', getSelectedBrush);
restartButton.addEventListener('click', restart);

let eraser = document.querySelector('#eraser');
eraser.addEventListener('click', eraseClickandDrag);

let colorBtns = document.querySelectorAll('.colorBtn');
colorBtns.forEach(button => {
    button.addEventListener('click', handleRandomColor);
})

let eraserPen = document.querySelector('#eraserPen');
eraserPen.addEventListener('click', erasePen);


GetGridSize();
