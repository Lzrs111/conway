import React from "react"
import Menu from "./menu.js";
import Game from "./game.js";
import './style.css'


class Main extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            running: false,
            newBoard: false,
            clear: false
        };
        this.runSwitch = this.runSwitch.bind(this)
        this.boardSwitch = this.boardSwitch.bind(this)
        this.clearSwitch = this.clearSwitch.bind(this)
    }
    runSwitch() {
        let run = !this.state.running
        this.setState({
            running: run 
        },()=>{
            console.log("game running:",this.state.running)
            })
    }
    boardSwitch() {
        let brd = !this.state.newBoard
        this.setState({
            newBoard: brd
        })
    }
    clearSwitch() {
        let clr = !this.state.clear
        this.setState({
            clear: clr
        })
    }
    render() {
        return (
            <div style={{height:"100%",width:"100%"}} >
                <div className="title" >
                    <h1 >
                        Conway's Game of Life
                    </h1>
                </div>
                <Game running={this.state.running} random={this.state.newBoard} clear={this.state.clear}/>
                <Menu runSwitch={this.runSwitch} randomize={this.boardSwitch} clear={this.clearSwitch} />
            </div>
        )
    }
}

export default Main