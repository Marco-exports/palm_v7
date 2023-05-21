import * as React from 'react';
import {Button} from 'baseui/button';
import {ThemeProvider, createTheme, lightThemePrimitives} from "baseui";
import {Drawer,ANCHOR,SIZE} from 'baseui/drawer';
import {TabFans} from './TabsFans';
import {TabWindows} from "./TabWindows";
import './Tabs.css';

export default () => {
   const [isOpen, setIsOpen] = React.useState(false);

   return (
      <React.Fragment>
         <ThemeProvider theme={createTheme(lightThemePrimitives,
            {colors:{ buttonPrimaryFill:"#2d2d5b", buttonPrimaryHover: "#113981"}})}>
            <Button onClick={() => setIsOpen(true)}>Configure...</Button>
         </ThemeProvider>

         <Drawer className="tabs-one" isOpen={isOpen} autoFocus size={SIZE.small} onClose={() => setIsOpen(false)} anchor={ANCHOR.top}>

            <div className = "tab_configuration">CONFIGURATION</div>

            <TabFans />

            <TabWindows />

         </Drawer>
      </React.Fragment>
   )
}

