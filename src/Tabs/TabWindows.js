import React from "react";
import axios from "axios";
import './Tabs.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

const columns = [
   { dataField: '_id', text: 'ID', headerStyle: (colum, colIndex) => {return { width: '60px', textAlign: 'center' }}},
   { dataField: 'delay', text: 'delay alert',align: 'center', editor: {type: Type.SELECT, options: [
      {value:0,label:'now'},{value:30,label:'30 sec'},{value:60,label:'1 min'},{value:120,label:'2 min'},{value:300,label:'5 min'}]},
      headerStyle: (colum, colIndex) => {return { width: '120px', textAlign: 'center' }}},
   { dataField: 'off_delay',text: 'shutdown',align: 'center', editor: {type: Type.SELECT, options: [
            {value:0,label:'now'},{value:30,label:'30 sec'},{value:60,label:'1 min'},{value:120,label:'2 min'},{value:300,label:'5 min'}]},
      headerStyle: (colum, colIndex) => {return { width: '120px', textAlign: 'center' };}},
   { dataField: 'RPi_GPIO',text:'GPIO',align:'center',editable:false, headerStyle: (colum, colIndex) => {return { width: '90px', textAlign: 'center' };}},
   { dataField: 'window',text: 'Window',editable:false,headerStyle: (colum, colIndex) => {return { width: '220px', textAlign: 'left' }}},
   { dataField: 'state', text: 'ON-Line',align: 'center',
      editor: {type: Type.SELECT, options: [{value: '1', label: 'ON'},{value: '0', label: 'OFF'}]},
      headerStyle: (colum, colIndex) => {return { textAlign: 'center' }}}
]

export class TabWindows extends React.Component {
   constructor(props) {
      super(props);
      this.state = {rowData: []};
   }
   componentDidMount() {
      fetch("/windows/Windows")
         .then(response => response.text())
         .then(data => {
            this.setState({rowData: JSON.parse(data)});
            console.log(this.state.rowData);
         })
   }
   fetchPUT=() =>{
      axios.defaults.headers = {'Content-Type': 'application/json'}
      let WindowsUpdate = JSON.stringify(this.node.table.props.data);
      axios.post('/windows/Windows', WindowsUpdate)
         .then(function (response) {
            console.log( response.data);
         })
         .catch(function (error) {
            console.log('POST error : ' + error);
         });
   }

   render() {
      return (
         <div>
            <button className="right" onClick={this.fetchPUT}>SAVE WINDOWS</button>
            <BootstrapTable
               ref={n => this.node = n}
               keyField="_id"
               data={this.state.rowData}
               columns={columns}
               hover
               condensed
               cellEdit={cellEditFactory({mode: 'click', blurToSave: true})}
               className="scroller"
            />
         </div>
      );
   }
}
