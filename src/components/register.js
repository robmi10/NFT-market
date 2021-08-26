import '../App.scss';
import React from "react";
import {withStyles } from '@material-ui/core/styles';
import {Grid, AppBar, Toolbar, InputBase, 
  IconButton, Button, TextField, Dialog, DialogTitle,
   DialogContent, DialogActions, Paper, Typography} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Metamask from './wallets/metamask'
import Protis from './wallets/protis'
import Walletconnect from './wallets/walletconnect';

   const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper:{
      color: "rgb(83, 110, 233)",
      background: "rgb(253, 253, 253)",
      boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
      borderRadius: 40,
      height: 300,
      padding: 20,
      marginTop: 10,
      width: 600,
      position: 'relative',
               left: 0,
               top: 0,

  },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    button: {
      width: 300,
      borderRadius: 40,
      boxShadow: 0,
      height: 100,
  
      cursor: 'pointer',
      '&:hover': {
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
      "&:focus" :{
      outline: "none",
      }
       },
    }
  );
 

class Register extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      value: 1,
      eth_address: ''
    }
  }

  handle_change = (value) => {
    this.setState({ value })
}


handleinputvalue = (addr)=>{
  console.log("Register add->", addr)
  this.setState({
    eth_address: addr
  })

  this.sendtoparents_from_register()
} 

sendtoparents_from_register = () =>{
  this.props.handleinputvalue_addr(this.state.eth_address);
}


  render(){
    const { classes } = this.props;
    let content_array = [<Metamask handleinputvalue = {this.handleinputvalue.bind(this)}/>, <Protis/>, <Walletconnect/>];

  return (
    <div className="App">
      
       <div className ="h1register" >
    <div className ="center">
        <h1>Choose Wallet</h1>
        <h2 className ="h2new">Connect with one of available wallet providers.</h2>

        </div>



        </div>
      <Tabs value={this.state.value} onChange={(e, v) => { this.handle_change(v) }} indicatorColor="primary"
                    textColor="primary" centered>
                    <Tab value='1' label='Metamask'></Tab>
                    <Tab value='3' label='Walletconnect'></Tab>
                </Tabs>
                {content_array[this.state.value - 1]}

      </div>
  );
}
}

export default withStyles(styles) (Register);