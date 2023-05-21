import React from "react";
import ReactModal from "react-modal";
import {Button} from 'baseui/button';
import {ThemeProvider, createTheme, lightThemePrimitives} from "baseui";
import {TabFans} from './TabsFans';
import {TabWindows} from "./TabWindows";
import './Tabs.css';

class Tabs2 extends React.Component {
   constructor(props) {
      super(props);
      this.state = {showModal: false};
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
   }
   handleOpenModal () {
      this.setState({ showModal: true });
   }
   handleCloseModal () {
      this.setState({ showModal: false });
   }

   render () {
      return (
         <div>
            <ThemeProvider theme={createTheme(lightThemePrimitives,
               {colors:{ buttonPrimaryFill:"#2d2d5b", buttonPrimaryHover: "#113981"}})}>
               <Button onClick={this.handleOpenModal}>Configure...</Button>
            </ThemeProvider>
            <ReactModal
               isOpen={this.state.showModal}
               contentLabel="onRequestClose Example"
               onRequestClose={this.handleCloseModal}
               ariaHideApp={false}
               className="Modal"
               overlayClassName="Overlay"
            >
               <button onClick={this.handleCloseModal}>Close Modal</button>
               <TabFans />
               <TabWindows />
            </ReactModal>
         </div>
      );
   }
}
export default Tabs2;
