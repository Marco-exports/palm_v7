// IN DEVELOPMENT  --  https://www.react-spring.dev/

import React from "react"
import {config} from "react-spring"
import {Keyframes, Spring, Trail} from 'react-spring/renderprops'
import _ from 'lodash'
import './Windows.css'
import socketIOClient from "socket.io-client"
import Window_open from "./MS_Window.png";

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
            {_id: "door", order: 1, window: "Sliding Door", state: 1, open: 1, ct_open: 3}],
         container : null,
         content : null
      }
   }

   async componentDidMount() {
      socket.on("Windows_API", data => { this.setState({windows: data})})
      socket.emit('GetWindows', {WINDOW: 'request'})     //  initial request for Windows data

      while (true) {
         this.container(Spring, {from: {x: -100}, to: {x: 0}, config: config.slow})
         await delay(100)
         await this.content(Trail, {from: {x: -120, opacity: 0}, to: {x: 0, opacity: 1}})
         this.content(Trail, {to: {x: -120, opacity: 0}})
         await delay(500)
         await this.container(Spring, {to: {x: -100}, config: config.slow})
      }
   }

   render() {
      let res = _.sortBy(this.state.windows, ['order']);   // sort by "order"
      res = res.filter(x => x.open !== 0)      // only if --> "state" = 1
      res = _.slice(res,0,4)       // display max --> 4 windows
      console.log(res)

      return(
         <div className="windows-container">
            <Keyframes script={next =>(this.container = next)}>
            <ul>
               {({ x }) => (
                  <li className="window-li" style={{transform: `translate3d(${x}%,0,0)` }}>
                    <Keyframes keys={res} script={next => (this.content = next)}>
                       {res.map(item => ({ x, ...props }) => (
                          <div className="item" style={{transform: `translate3d(${x}%,0,0)`, ...props }}>
                             <img className="window-icon" src={Window_open} alt="!"/>
                             <div className="window-name">{item.window}</div>
                             <div className="window-open">{item.open}</div>
                          </div>
                          ))}
                    </Keyframes>
                  </li>
               )}
            </ul>
            </Keyframes>
         </div>
      )
   }
}
export default WindowsOpen

