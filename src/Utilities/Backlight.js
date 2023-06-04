import React, {Component} from 'react'

class Backlight extends Component {
   constructor(props) {
      super(props)
      this.state = { result: null }
   }
   componentDidMount() {
      fetch("/backlight/setBrightness/30")
         .then(response => response.text())
         .then(data => this.setState(({result: data})))
   }

   render() {
      return (
         <div className="backlight">
            <div>----</div>
         </div>
      )
   }
}
export default Backlight


// <div className="backlight">
//   <div>{this.state.result}</div>
// </div>