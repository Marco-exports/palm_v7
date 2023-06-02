import React from "react"
import socketIOClient from "socket.io-client"
const socket = socketIOClient()

class OneWireTemp extends React.Component {
   constructor() {
      super()
      this.state = { response: 0 }
   }
   componentDidMount() {
      socket.on("DS18_API", data => { this.setState({ response: data }) })   // temperature F
      socket.emit('Get_DS18', { Get_One_Wire : 'request' })  // request streaming One_Wire
   }

   render() {
      const { response } = this.state
      return (
         <div className="one_Wire_Temp">
            Temp : {response}
         </div>
      );
   }
}
export default OneWireTemp
