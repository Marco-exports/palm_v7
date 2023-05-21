import React from "react"
import {ReactComponent as AppReload} from './AppReload.svg'
import "./AppReload.css"

class AppReloader extends React.Component {

   render() {
      return (
         <div className='appReloader'>
            <AppReload onClick = {this._refreshPage} />
         </div>
      )
   }
   _refreshPage() {window.location.reload(true) }    // force reload == "true"
}
export default AppReloader
