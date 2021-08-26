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
import Jdenticon from 'react-jdenticon';

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
        color: "white",
        background: "#6851ff",
        width: 100,
        borderRadius: 40,
        boxShadow: 0,
        height: 50,
      
        
         },
    }
  );

class Buy extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
        open: false,
        bid: 0,
        input_amount: 0,
        symbols: ["$", "£", "SEK", "ETH"],
        current_symbol: "",
        tokenID: 0
    }
  }

  componentDidMount = () =>{
      this.setState({
          open: this.props.open,
      })
  }

  loadblockchain_get_tokenid= async ()=>{
    console.log('INSIDE loadblockchain_get_tokenid')

    console.log("TOKENURI IN TIMER ->", this.props.tokenURI)
    const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = NftExample.networks[networkId];
    const contract = new web3.eth.Contract(
      NftExample.abi, CONTRACT_ADRESS
    );
    const accounts = await web3.eth.getAccounts()
    const chainId = await web3.eth.getChainId();

    console.log("TOKENURI ---->", this.props.tokenURI)
    const Transaction = await contract.methods.get_user_tokenID(this.props.tokenURI).call();
    
    this.setState({
        tokenID: Transaction
    })

    this.loadblockchain_put_bid()
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

    console.log("this.props.location.state.eth_address", this.props.eth_address)

    console.log("this.props.eth_addr", this.props.addr)
    console.log("this.state.tokenID", this.state.tokenID)

    const Transaction = await contract.methods.transfer_nft(this.props.addr, this.props.eth_address, this.state.tokenID).send({from: accounts[0], gas: 5000000});
    
    console.log("Transaction get all auction", Transaction)

    this.setState({
      auction_list: Transaction
    })

    alert("Your transaction succeded");
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

                    <Dialog 
                            
                            maxWidth="md"

                            open={this.state.open}
                
                            style={{ cursor: 'cursor'}}
                        ><DialogTitle style={{ cursor: 'cursor'}}>
                            <DialogContent>
                        
                        <div style={{overflow: 'hidden'}}>
                        <h1>Buy nft</h1>  

                        <h3>Seller:</h3>
                    
                        <h4 className ="h1go">{this.props.addr}<Jdenticon size="30" value={this.props.addr.substr(0, 15)} /></h4>

                        <h3>Price: </h3>
                        <h4 className ="h1go">{this.props.price} </h4>

                        <h3>Title:</h3>
                        <h4 className ="h1go">{this.props.title} </h4>

                        <h3>Description: </h3>
                        <h4 className ="h1go">{this.props.description} </h4>

                        <img className ="h1go" style ={{height: 400, witdh: 600, borderRadius: 40}} src={this.props.image.replace(/['"]+/g, '')} /> 
                        
                        </div>
                        
            
                        <h3>Buy</h3>

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

                       

                                    <DialogActions style={{ cursor: 'pointer'}}>
                        <Button className={classes.button} autoFocus onClick={()=>{
                            this.loadblockchain_get_tokenid()
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

                    <Button style={{
                          color: "white",
                          background: "#6851ff",
                          width: 100,
                          borderRadius: 40,
                          boxShadow: 0,
                          height: 50,
                      }}  onClick={()=>{
                            this.handle_open()
                        }} variant="fab" >
                          
                    Buy
                    </Button>

        
      </div>
  );
}
}

export default withStyles(styles) (Buy);