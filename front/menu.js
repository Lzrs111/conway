import React from "react"


class Menu extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return(
                <div className="menu"> 
                  <button onClick={()=>{
                      this.props.runSwitch()
                      }} className="menuButton">
                      Start/stop
                  </button>
                  <button onClick={()=>{
                      this.props.clear()
                      }} className="menuButton">
                      Clear board
                  </button>
                  <button onClick={()=>{
                      this.props.randomize()
                      }} className="menuButton">
                      Randomize board
                  </button>
                </ div >
        )
    }
}

export default Menu