import React from "react"
import './Windows.css'
import Window_open from './MS_Window.png'

class WindowList extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         window_count: this.props.windows.length,
         windowArray: this.props.windows
      }
   }
   componentDidMount() {}

   render() {
      console.log(this.state.windowArray)
      return (
            <ul >
               {this.state.windowArray.map(item => {
                  return(
                  <li className="window-li" key={item._id}>
                     <img className="window-icon" src={Window_open} alt="!"/>
                     <div className="window-name">{item.window}</div>
                     <div className="window-open">{item.open}</div>
                  </li>
                  )}
               )}
            </ul>
      )
   }
}
export default WindowList
