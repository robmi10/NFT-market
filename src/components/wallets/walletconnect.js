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

class Walletconnect extends React.Component {
  
  constructor(props){
    super(props);

  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      alert("install metamask!!")
    }
  }

  connect_wallet = ()=>{
    console.log("connect wallet")

    this.loadWeb3()

  }
  
  render(){
    const { classes } = this.props;

  return (
    <div className="App">
      <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            >
      
<motion.button className={classes.paper}
    whileHover={{  scale: 1.1 }}
    whileTap={{  scale: 0.9 }}
  >
          <img width="80" 
            height="80" src="https://walletconnect.org/walletconnect-logo.svg"
            />
       <div className ="h1register">
       <div className ="center">
        <h2>Wallet Connect</h2>
        <h3 className ="h2new">Connect with your email and password</h3>
        <Button onClick ={this.connect_wallet}> Connect</Button>
        </div>
        </div>
      </motion.button>
      </Grid>
      </div>
  );
}
}

export default withStyles(styles) (Walletconnect);