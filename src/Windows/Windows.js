import React from "react"
import _ from 'lodash'
import './Windows.css'
import socketIOClient from "socket.io-client"
import Window_open from "./MS_Window.png"
const socket = socketIOClient()

class WindowsOpen extends React.Component {
    constructor() {
        super()
        this.state = {
           windows : []
        }
    }
    componentDidMount() {
        socket.on("Windows_API", data => { this.setState({ windows: data } ) })
        socket.emit('GetWindows', {WINDOW: 'request'})  //  initial request for Windows data
    }

    render() {
       let res = _.sortBy(this.state.windows, ['order'])   // sort by "order"
       res = res.filter(x => x.open !== 0)      // only if --> "state" = 1
       res = _.slice(res,0,4)       // display max --> 4 windows

       console.log(res)

       return(
          <div className="windows-container">
             <ul>
                {res.map(item =>
                   <li className="window-li" key={item._id}>
                      <img className="window-icon" src={Window_open} alt="!"/>
                      <div className="window-name">{item.window}</div>
                      <div className="window-open">{item.open}</div>
                   </li>)
                }
             </ul>
          </div>
       )
    }
}
export default WindowsOpen
