import React, { Component } from 'react';

class BrowserSize extends Component {
   constructor(props) {
      super(props);
      this.state = { result: null, width: 0, height: 0 };
   }
   componentDidMount() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
   }

   render() {
      return (
         <div className="browser-size">
            <div>{ this.state.width}x{ this.state.height}</div>
         </div>
      );
   }
}
export default BrowserSize;
