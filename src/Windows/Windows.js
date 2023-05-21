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
           windows : [
               {_id: "side", order: 4, window: "Side Window", state: 0, open: 1, ct_open: 8},
               {_id: "left", order: 3, window: "Left Window", state: 1, open: 0, ct_open: 4},
               {_id: "right", order: 2, window: "Right Window", state: 1, open: 1, ct_open: 2},
               {_id: "center", order: 5, window: "Center Window", state: 1, open: 1, ct_open: 10},
               {_id: "door", order: 1, window: "Sliding Door", state: 1, open: 1, ct_open: 3}]
        }
    }
    componentDidMount() {
        socket.on("Windows_API", data => { this.setState({ windows: data } ) })
        socket.emit('GetWindows', {WINDOW: 'request'})  //  initial request for Windows data
    }

    render() {
       let res = _.sortBy(this.state.windows, ['order']);   // sort by "order"
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
