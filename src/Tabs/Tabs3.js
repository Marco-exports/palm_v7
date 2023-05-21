import * as React from 'react';
import {Button} from 'baseui/button';
import {Drawer,ANCHOR} from 'baseui/drawer';

export default () => {
   let initialState = {};
   const [isOpen, setIsOpen] = React.useState(initialState);
   function close(anchorType) { setIsOpen({...isOpen, [anchorType]: false});}
   return (
      <React.Fragment>
         <Button onClick={() => setIsOpen(true)}>Open Drawer here</Button>
         HELLO !
         <Drawer  isOpen={isOpen} autoFocus onClose={() => setIsOpen(false)} anchor={ANCHOR.top}>
            <div>drawer content This content rendered and also
               rendered even if the
            </div>
         </Drawer>

      </React.Fragment>
   )
}
