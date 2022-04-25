document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8
    const squares = []
    // const candyColors = [
    //     'yellow',
    //     'orange',
    //     'purple',
    //     'green',
    //     'red',
    //     'blue'
    // ]
    const candyColors = [
        'url(images/1.jpeg)',
        'url(images/2.jpeg)',
        'url(images/3.jpeg)',
        'url(images/4.jpeg)',
        'url(images/5.jpeg)',
        'url(images/6.jpeg)'
    ]
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundColor = candyColors[randomColor]
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            grid.appendChild(square)
            squares.push(square)
        }

    }

    createBoard()

    let colorDragged, colorReplaced, squareDragged, squareReplaced
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart(e) {
        colorDragged = this.style.backgroundColor
        squareDragged = parseInt(this.id)
    }

    function dragOver(e) {
        e.preventDefault()
    }


    function dragEnter(e) {
        e.preventDefault()
    }

    function dragLeave() {

    }

    function dragDrop() {
        colorReplaced = this.style.backgroundColor
        squareReplaced = parseInt(this.id)
        this.style.backgroundColor = colorDragged
        squares[squareDragged].style.backgroundColor = colorReplaced
    }

    function dragEnd() {

        const validMoves = [
            squareDragged - 1,
            squareDragged - width,
            squareDragged + 1,
            squareDragged + width
        ]

        let validMove = validMoves.includes(squareReplaced)

        if (validMove && squareDragged) {
            squareReplaced = null
        } else if (squareDragged && !validMove) {
            squares[squareReplaced].style.backgroundColor = colorReplaced
            squares[squareDragged].style.backgroundColor = colorDragged
        } else {
            squares[squareDragged].style.backgroundColor = colorDragged
        }


    }

    function checkRow3() {
        for (let i = 0; i < 61; i++) {
            let row3 = [i, i + 1, i + 2]
            let colorInterest = squares[i].style.backgroundColor
            const blankSquare = squares[i].style.backgroundColor === ''
            const notValidMoves = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (notValidMoves.includes(i)) continue

            if (row3.every(index => squares[index].style.backgroundColor === colorInterest && !blankSquare)) {
                row3.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }

    }
    function checkRow4() {
        for (let i = 0; i < 60; i++) {
            let row4 = [i, i + 1, i + 2,i+3]
            let colorInterest = squares[i].style.backgroundColor
            const blankSquare = squares[i].style.backgroundColor === ''
            const notValidMoves = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
            if (notValidMoves.includes(i)) continue

            if (row4.every(index => squares[index].style.backgroundColor === colorInterest && !blankSquare)) {
                row4.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }

    }

    function checkCol3() {
        for (let i = 0; i < 47; i++) {
            let col3 = [i, i + width, i + width*2]
            let colorInterest = squares[i].style.backgroundColor
            const blankSquare = squares[i].style.backgroundColor === ''
            if (col3.every(index => squares[index].style.backgroundColor === colorInterest && !blankSquare)) {
                col3.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }

    function checkCol4() {
        for (let i = 0; i <39; i++) {
            let col4 = [i, i + width, i + width*2,i+width*3]
            let colorInterest = squares[i].style.backgroundColor
            const blankSquare = squares[i].style.backgroundColor === ''
            if (col4.every(index => squares[index].style.backgroundColor === colorInterest && !blankSquare)) {
                col4.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }

    function candyRefreshed() {
        for (let i =0; i<55;i++){
            if(squares[i+width].style.backgroundColor === ''){
                squares[i+width].style.backgroundColor = squares[i].style.backgroundColor
                squares[i].style.backgroundColor = ''
                const topRow = [0,1,2,3,4,5,6,7]
                const isTop = topRow.includes(i)
                if (isTop && squares[i].style.backgroundColor===''){
                    let randomCandy = Math.floor(Math.random()*candyColors.length)
                    squares[i].style.backgroundColor = candyColors[randomCandy]
                }
            }
        }
    }

    window.setInterval(function () {
        candyRefreshed()
        checkRow3()
        checkRow4()
        checkCol3()
        checkCol4()
    }, 100)
})