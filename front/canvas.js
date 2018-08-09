import React from "react"
import ReactDOM from "react-dom"
import Square from "./square"


export default class Canvas extends React.Component {
    constructor(props){
        super(props)
        this.squares = []
        this.rows = 0
        this.cols = 0
        this.sqw = 20 
        this.state = {
            frame:props.frame,
        }

        this.gameLoop = this.gameLoop.bind(this);
        this.createSquares = this.createSquares.bind(this)
        this.clickHandle = this.clickHandle.bind(this)
        this.randomizeBoard = this.randomizeBoard.bind(this)
        this.clearBoard = this.clearBoard.bind(this)
    }
    componentDidMount () {
        let canv = ReactDOM.findDOMNode(this)
        canv.addEventListener("click",this.clickHandle)
    }
    componentDidUpdate (prevProps) {
        console.log(prevProps)
        if (prevProps.width == 0 && this.props.width > 0){
            this.rows = Math.floor(this.props.height/this.sqw) 
            this.cols = Math.floor(this.props.width/this.sqw) 
            let canv = ReactDOM.findDOMNode(this)
            let ctx = canv.getContext("2d")
            console.log(this.rows,this.cols)

            this.createSquares(ctx)

            //determine neighbours of all squares
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0;j < this.cols; j++) {
                    var rowLimit = this.squares.length-1;
                    if(rowLimit > 0){
                        var columnLimit = this.squares[0].length-1;
                        for(var x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++){
                            for(var y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++){
                                if(x != i || y != j){
                                    this.squares[i][j].neighbours.push(this.squares[x][y])
                                }
                            }
                        }
                    }  
                }
            }
        } else if (prevProps.random !=this.props.random){
            this.randomizeBoard()
        }
        else if (prevProps.clear != this.props.clear) {
            this.clearBoard()
        } else {
        var context = ReactDOM.findDOMNode(this).getContext('2d')
        this.gameLoop(context)
        }
    }
    gameLoop(ctx) {
        this.squares.forEach((element)=>{
            element.forEach(sq => {
                sq.determineStatus()
                sq.render(ctx)
            })
        })

        this.squares.forEach(element => {
            element.forEach(sq => {
                sq.alive = sq.nextTurn
            })
        })

    }
    createSquares(ctx) {
        var x = 0
        var y = -this.sqw
        for (let i = 1; i <= this.rows ; i++) {
            y+=this.sqw
            x=0
            var row = []
            for (let j = 1; j<=this.cols;j++) {
                var square = new Square(x,y,this.sqw)
                square.initialRender(ctx)
                x+=this.sqw
                row.push(square)
            }
            this.squares.push(row)
        }
    }
    clickHandle(e) {
        var xPosition = 0;
        var yPosition = 0;
        var element = ReactDOM.findDOMNode(this)

        while(element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }

        var clX = e.clientX - xPosition
        var clY = e.clientY - yPosition
        console.log(clX,clY)
        this.squares.forEach(element => {
            element.forEach(sq => {
                if (clX > sq.x && clX < sq.x+this.sqw) {
                    if (clY > sq.y && clY < sq.y+this.sqw){
                        sq.alive = true
                        sq.render(ReactDOM.findDOMNode(this).getContext("2d"))
                    }
                }
            })
        })
    }
    randomizeBoard() {
        this.squares.forEach(element => {
            element.forEach(sq=>{
                if (Math.random()>0.7) {
                    sq.alive = true 
                } else {
                    sq.alive = false
                }
                sq.render(ReactDOM.findDOMNode(this).getContext("2d"))
            })
            
        });
    }
    clearBoard () {
        this.squares.forEach(element => {
            element.forEach(sq=>{
                sq.nextTurn = false
                sq.alive = false
                sq.render(ReactDOM.findDOMNode(this).getContext("2d"))
            })
            
        });
    }
    render() {
        return(
            <canvas className="canvas" width={this.props.width} height={this.props.height}>
            </canvas>
        )
    }
}