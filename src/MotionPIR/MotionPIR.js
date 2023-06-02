import React from "react"
import socketIOClient from "socket.io-client"
const socket = socketIOClient()

class MotionPIR extends React.Component {
   constructor() {
      super()
      this.state = { response: 0 }
   }
   componentDidMount() {
      socket.on("PIRs_API", data => { this.setState({ response: data }) })   // "1" or "0"
      socket.emit('Get_PIRs', { PIR_motion : 'request' })  // request streaming PIRs
   }

   render() {
      const { response } = this.state
      return (
         <div className="motion_PIR">
            PIR move : {response}
         </div>
      );
   }
}
export default MotionPIR
