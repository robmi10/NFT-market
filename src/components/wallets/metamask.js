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

class Metamask extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      eth_address: '',
    }
  }


  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()

      const accounts = await window.web3.eth.getAccounts()

      console.log("Accounts->", accounts)
      this.setState({
        eth_address: accounts[0]
      })

      this.sendtoparents()
      
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      alert("install metamask!!")
    }
  }

  connect_wallet  = async()=>{
    console.log("Connect wallet..")
    this.loadWeb3()
  }

  sendtoparents = () =>{
    console.log("Customer sendtoparents->",this.state.eth_address)
    this.props.handleinputvalue(this.state.eth_address);
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
    whileTap={{  scale: 0.9 }, this.connect_wallet}
  
  >
    
    <img  width="80" 
            height="80" src="https://assets.website-files.com/5cc650c90871f71dc42adb22/5d9389e3cec33130b68df7df_metamask.png"
            />
       
        
       <div className ="h1register">
              <div className ="center">

              <h2>Metamask</h2>
              <h3 className ="h2new">One of the most secure wallets with great flexibility</h3>
              </div>
        </div>

      </motion.button>
      </Grid>
      </div>
  );
}
}

export default withStyles(styles) (Metamask);