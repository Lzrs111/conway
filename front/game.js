import React from "react"
import ReactDOM from "react-dom"
import Canvas from "./canvas"


class Game extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            frame: 0,
            width: 0,
            height: 0,
        };
        this.tick = this.tick.bind(this)
    }
    componentDidMount () {
        this.setState({
            width: parseInt(window.getComputedStyle(ReactDOM.findDOMNode(this)).width)*0.6,
            height: parseInt(window.getComputedStyle(ReactDOM.findDOMNode(this)).height)
        },()=>{
            console.log(this.state.width)
            })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.running == false && this.props.running == true){
            requestAnimationFrame(this.tick)
        }
    }
    
    tick() {
        this.setState({
            frame: this.state.frame+1
        },()=>{
            if (this.props.running){
                setTimeout(() => {
                   requestAnimationFrame(this.tick)
                }, 100);
            }
        })
    }  
    render() {
        return(
            <div className="canvasWrap">
               <Canvas frame={this.state.frame} width={this.state.width} height={this.state.height} random={this.props.random} clear={this.props.clear}/> 
            </ div >
        )
    }
}

export default Game