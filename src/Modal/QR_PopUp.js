import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import './QR_PopUp.css'
import {ReactComponent as QRimage} from './QR_iPhone.svg'

Modal.setAppElement('#root')

function QRcode(){
   const [modalIsOpen, setIsOpen] = React.useState(false)
   function openModal() {setIsOpen(true)}
   function afterOpenModal() {}
   function closeModal(){setIsOpen(false)}

   return (
      <div>
         <QRimage className='QR-icon' onClick={openModal}/>
         <Modal
            className='modal-main'
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={false}
            overlayClassName="Overlay"
         >
            <img src={'/QRQRQ'} alt="!" className='QR-image' onClick={closeModal}/>
         </Modal>
      </div>
   );
}
export default QRcode

const props = {}
ReactDOM.render(<QRcode className='modal' {...props} />, document.getElementById('root'))
