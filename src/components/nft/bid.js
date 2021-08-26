import '../../App.scss'
import React from "react";
import {withStyles } from '@material-ui/core/styles';
import {Grid, AppBar, Toolbar, InputBase, 
  IconButton, Button, TextField, Dialog, DialogTitle,
   DialogContent, DialogActions, Paper, Typography} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { motion  } from "framer-motion"
import {CONTRACT_ADRESS, HTTP_PROVIDER} from '../config.js'
import NftExample from "../../contracts/NftExample.json";
import Market from "../../components/market";
import Web3 from 'web3'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import MenuItem from '@material-ui/core/MenuItem';
import Timer_2 from './timer_2'


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
    button1: {
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

       button: {
        color: "white",
        background: "#6851ff",
        width: 100,
        borderRadius: 40,
        boxShadow: 0,
        height: 50,
      
        
         },
    }
  );

class Bid extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
        open: false,
        bid: 0,
        input_amount: 0,
        symbols: ["$", "£", "SEK", "ETH"],
        current_symbol: ""
    }
  }

  componentDidMount = () =>{
      this.setState({
          open: this.props.open,
          
      })
  }

  loadblockchain_put_bid= async ()=>{
    console.log('INSIDE loadblockchain_nft_auction')
    const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = NftExample.networks[networkId];
    const contract = new web3.eth.Contract(
      NftExample.abi, CONTRACT_ADRESS
    );

    const accounts = await web3.eth.getAccounts()
    const chainId = await web3.eth.getChainId();

    const Transaction = await contract.methods.bid(this.state.input_amount).send({from: accounts[0], gas: 5000000});
    
    console.log("Transaction get all auction", Transaction)

    this.setState({
      auction_list: Transaction
    })

    alert("Your Auction is started");
  }

  handleclose = () =>{
    console.log("closed")

    this.setState({
      open: false
    })
  }     

  handle_bid = (e) =>{
    console.log("input_date", e.target.value)
    this.setState({
      bid : e.target.value
    })
  }

  handle_open = () =>{
    console.log("ITS OPEN")
    this.setState({
        open: true
    })
  }

  handle_symbol_selection = (e) =>{

    this.setState({
      current_symbol: e.target.value
    })
  }

  render(){
    const { classes } = this.props;


  return (
    <div className="App">
                  {/*   <Market handle_open = {this.handle_open.bind(this)} /> */}

                    <Dialog 
                            
                            maxWidth="md"
                           
                            open={this.state.open}
                
                            style={{ cursor: 'move' }}
                        ><DialogTitle style={{ cursor: 'pointer'}}>
                            <DialogContent>

                        <h1>Put Bid </h1>  

                        <h3>Current Owner: <p>{this.props.benecifiary}</p> </h3>
                        
                        <h3>Highest Bider: <p>{this.props.Bider}</p></h3>

                        <h3>Current Bid:  <p>{this.props.Bidsize}</p></h3>

                        <Timer_2 token_URI = {this.props.tokenURI} > </Timer_2> 
                        

                        <img style ={{height: 400, witdh: 600}} src={this.props.image.replace(/['"]+/g, '')} />

                        
            
                        <h3>Select bid</h3>

                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Currency selection"
                            onChange={this.handle_symbol_selection}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select currencie"
                            variant="outlined"
                            >

                          {this.state.symbols.map((option) => (
                                <option>
                                    {option}
                                </option>
                            ))}
                            
                            </TextField>

                            <CurrencyTextField
                                label="Amount"
                                variant="standard"
                            
                                currencySymbol= {this.state.current_symbol}
                                //minimumValue="0"
                                outputFormat="string"
                                decimalCharacter="."
                                digitGroupSeparator=","
                                variant="outlined"
                                onChange={this.handle_bid}
                            />

                       

                                    <DialogActions>
                        <Button className={classes.button} autoFocus onClick={()=>{
                            this.loadblockchain_put_bid()
                            this.handleclose()
                        }} color="primary">
                            Submit
                        </Button>
                        <Button className={classes.button} autoFocus  onClick={()=>{
                                                  
                                    this.handleclose()
                                    }} color="primary">
                            Cancel
                        </Button>
                        </DialogActions>

                    </DialogContent>
                    </DialogTitle>
                    </Dialog>

                    <Button className={classes.button} autoFocus  onClick={()=>{
                            this.handle_open()
                        }} color="primary">
                          
                    Bid
                    </Button>

        
      </div>
  );
}
}

export default withStyles(styles) (Bid);