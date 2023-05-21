import React from "react";
import axios from "axios";
import './Tabs.css';
import { Range, getTrackBackground } from "react-range";
import {Button,SIZE,SHAPE} from 'baseui/button';
import {ThemeProvider, createTheme, lightThemePrimitives} from "baseui";
import fan_on from './Auto-icon-on.gif';
const STEP = 1; const MIN = 20; const MAX = 100;
const COLORS = [ '#5B91F4', '#276EF1', '#1E54B7','#174291','#102C60'];

export class TabFans extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         values: [],
         finalValues: [],
         fanValues: []
      };
   }
   componentDidMount() {
      fetch("/fans/TabsFan")
         .then(response => response.text())
         .then(data => {
            this.setState({ values: JSON.parse(data) } );
            console.log(this.state.values);
         })
   }
   fetchPUT() {
      axios.post('/fans/TabsFan', this.state.values)
         .then(function (response) {
            console.log(response.data);
         })
         .catch(function (error) {
            console.log('POST error : ' + error);
         });
   }

   render() {
      return (
         <React.Fragment>
            <div style={{display: "flex", justifyContent: "left", flexWrap: "wrap", margin: "2em"}} >
               <Range
                  values={this.state.values} step={STEP} min={MIN} max={MAX}
                  onChange={values => this.setState({ values })}
                  onFinalChange={values => this.setState({ finalValues: values} , () => {
                     this.setState({fanValues: JSON.stringify(this.state.finalValues)});
                     console.log(this.state.finalValues);
                     console.log(JSON.stringify(this.state.finalValues))})}
                  renderTrack={({ props, children }) => (
                     <div onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart}
                          style={{...props.style, height: "36px", display: "flex", width: "65%"}}>
                        <div ref={props.ref}
                             style={{height: "5px", width: "100%", borderRadius: "4px",alignSelf: "center",
                                background: getTrackBackground({values: this.state.values, colors: COLORS, min: MIN, max: MAX})
                             }}> {children}
                        </div>
                     </div>
                  )}
                  renderThumb={({ props, isDragged, index }) => (
                     <div {...props}
                          style={{ position: 'absolute', top: '2px', color: '#fff', fontWeight: 'bold', fontSize: '14px',
                             fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                             padding: '4px', borderRadius: '4px', backgroundColor: '#2369ef'}}>
                        {this.state.values[index].toFixed(0)}
                        <div style={{ height: "16px", width: "5px", backgroundColor: isDragged ? COLORS[index] : "#CCC" }}/></div>
                  )}
               />
               <output style={{ marginTop: "-30px", marginLeft: "20px" }}>
                  <ThemeProvider theme={createTheme(lightThemePrimitives,{colors:{buttonPrimaryFill:"#2d2d5b",buttonPrimaryHover: "#174291"}})}>
                     <img className="fan_auto" src={fan_on} alt="!" />
                     <Button shape={SHAPE.pill} size={SIZE.compact}
                             className="button_fans" onClick={() => this.fetchPUT()}>SAVE FANs
                     </Button>
                  </ThemeProvider>
               </output>
            </div>
         </React.Fragment>
      )
   }
}
