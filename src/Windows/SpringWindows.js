// IN DEVELOPMENT -- https://www.react-spring.dev/

import React, {useState} from "react"
import _ from 'lodash'
import {animated, useTrail} from "react-spring"
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
      const [isHide, setHide] = useState(false)
      const toggle = () => setHide(state => !state)
      const trail = useTrail(res.length, {
         from: { opacity: 0 }, opacity: isHide ? 0 : 1, config: { duration: 3000 },
         reset: true, onRest: toggle
      })

      return (
      <ul>
         {trail.map(({ opacity }, i) => {
            const item = res[i]
            return (
               <animated.li style={{ opacity }} key={item}> {item}
                  <img className="window-icon" src={Window_open} alt="!"/>
                  <div className="window-name">{item.window}</div>
                  <div className="window-open">{item.open}</div>
               </animated.li>
            )
         }
         )}
      </ul>
      )
   }
}

export default WindowsOpen
