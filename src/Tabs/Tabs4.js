import React from "react";
import NumPad from 'react-numpad';
import Popup from "reactjs-popup";
import "./Tabs.css";

export default () => (
    <Popup trigger={<button className="pop_button"> CONFIGURATION </button>} modal>
        {close => (
            <div className="modal">
                <div className="close_btn" onClick={close}>&times;</div>
                <div className="header"> CONFIGURE </div>
                <div className="content">
                    <div className="div1">
                        <NumPad.Number
                            onChange={(value) => { console.log('value', value)}}
                            label={'Delay'}
                            position="startBottomLeft"
                            value={0}
                            decimal={0}
                            confirm={1}
                            negative={false}>
                            <button>  Click me!</button>
                        </NumPad.Number>
                    </div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
                    Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
                    delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
                    commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
                    explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
                </div>
                <div className="actions">
                    <Popup trigger={<button className="pop_button"> Triggers </button>}
                           position="top center" closeOnDocumentClick >
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                            magni omnis delectus nemo, maxime molestiae dolorem numquam
                            <br />
                            mollitia, voluptate ea, accusamus excepturi deleniti ratione
                            sapiente! Laudantium, aperiam doloribus. Odit, aut.
                        </span>
                    </Popup>
                    <button className="pop_button" onClick={() => {close()} }>close modal</button>
                </div>
            </div>
        )}
    </Popup>
);
