import '../../App.scss'
import React from "react";
import {withStyles } from '@material-ui/core/styles';
import {Grid, AppBar, Toolbar, InputBase, 
  IconButton, Button, TextField, Dialog, DialogTitle,
   DialogContent, DialogActions, Paper, Typography} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { motion  } from "framer-motion"
import Web3 from 'web3'
import {CONTRACT_ADRESS, HTTP_PROVIDER} from '../config.js'
import NftExample from "../../contracts/NftExample.json";

   const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper:{
      background: "rgb(253, 253, 253)",
      boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
      borderRadius: 40,
      height: 250,
      padding: 20,
      marginTop: 20,
      width: 400,
      position: 'relative',
               left: 0,
               top: 0,
               cursor: 'pointer',

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

class Timer_2 extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      timer_days: 0,
      timer_hour: 0,
      timer_minutes: 0,
      timer_seconds: 0,
      auction_time:0,
    }
  }

  componentDidMount (){
    console.log("inside component update-->")
    this.test_func()
  }

  test_func = () =>{
    setInterval(() => {
    this.setState(
      {   
           timer_days: JSON.parse(localStorage.getItem(this.props.token_URI)).days,
           timer_hour: JSON.parse(localStorage.getItem(this.props.token_URI)).hours,
           timer_minutes: JSON.parse(localStorage.getItem(this.props.token_URI)).minutes, 
           timer_seconds: JSON.parse(localStorage.getItem(this.props.token_URI)).seconds 
      })
    }, 1000)
  }

  render(){
    const { classes } = this.props;

  return (
    <div className="App">
      {  <h3>Days: {JSON.parse(localStorage.getItem(this.props.token_URI)).days }
                      Hour: {JSON.parse(localStorage.getItem(this.props.token_URI)).hours}
                      Minutes: {JSON.parse(localStorage.getItem(this.props.token_URI)).minutes}
                      Seconds: {JSON.parse(localStorage.getItem(this.props.token_URI)).seconds}</h3>} 
      </div>
  );
}
}

export default withStyles(styles) (Timer_2);