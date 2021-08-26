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
import axios from 'axios';

const styles = theme => ({
        
})

class Timer extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      timer_days: 0,
      timer_hour: 0,
      timer_minutes: 0,
      timer_seconds: 0,
      auction_time:0,
      tokenURI: "",
      auction_status: false,
      open: false,
      input_date: 0,
      tokenID: 0,
      image_uri: ""
    }
  }


  get_image_URI(){
    axios.get(this.props.tokenURI)
    .then(res =>  this.setState({
        image_uri: res.data.image
    })
    );
    }


  loadblockchain_nft_auction= async ()=>{
    console.log('INSIDE loadblockchain_nft_auction STARTED')
    const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = NftExample.networks[networkId];
    const contract = new web3.eth.Contract(
      NftExample.abi, CONTRACT_ADRESS
    );

    console.log('this.state.auction_time', this.state.auction_time)

    console.log('this.props.location.state.eth_address', this.props.eth_addr)

    console.log('this.state.tokenID', this.state.tokenID)

    console.log('this.state.tokenURI------>', this.props.tokenURI)

    console.log('CURR IMAGE URI', this.state.image_uri)

    const accounts = await web3.eth.getAccounts()
    const chainId = await web3.eth.getChainId();

    const Transaction = await contract.methods.on_auction(this.state.auction_time, this.props.eth_addr, this.state.tokenID, this.state.image_uri, this.props.tokenURI).send({from: accounts[0], gas: 5000000});

    console.log("Transaction start auction", Transaction)
    
    this.loadblockchain_get_auction(Transaction)
    
    alert("Your Auction is started");
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

    const Transaction = await contract.methods.get_user_tokenID(this.props.tokenURI).call();

    console.log('Blockchain ID->', Transaction)


    
    this.setState({
        tokenID: Transaction
    })

    this.loadblockchain_nft_auction()
  }

  loadblockchain_get_auction= async ()=>{
    console.log('INSIDE get auctions')
    const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = NftExample.networks[networkId];
    const contract = new web3.eth.Contract(
      NftExample.abi, CONTRACT_ADRESS
    );
      
    const accounts = await web3.eth.getAccounts()
    const chainId = await web3.eth.getChainId();

    const Transaction = await contract.methods.get_auctionTime(this.state.tokenID).call();
    
    let block = await web3.eth.getBlock("latest")
    
    console.log("Transaction get auction time", block)

    console.log("Transaction TIMESTAMP AUCTION TIME", block.timestamp)

    console.log("Current ID -----> ", this.state.tokenID)

    console.log("Transaction get auction time", Transaction)

    const curr_uri = this.props.tokenURI
    const input_date = this.state.input_date.toString()
    const _time = block.timestamp * 1000
    const days = 0
    const hours = 0
    const minutes = 0
    const seconds = 0

    console.log("DATE INSIDE GET AUCTION", input_date)

    const object = {_time, input_date, days, hours, minutes, seconds}

   

    localStorage.setItem(this.props.tokenURI, JSON.stringify(object))

    this.setState({
      auction_time: block.timestamp
    })

    if(this.state.timer_days != null){
        console.log("inside timer days !!!!!")
    this.function_curr_time(block.timestamp)
    }

  
  }

  function_curr_time = (distancee) =>{
  
   {console.log("this.props.tokenURI get item data->", this.props.tokenURI)}
    
    let distancee_seconds = JSON.parse(localStorage.getItem(this.props.tokenURI))._time 

    console.log("getitem tokenuri ->", JSON.parse(localStorage.getItem(this.props.tokenURI)))

    console.log("DATE URI ->", JSON.parse(localStorage.getItem(this.props.tokenURI))._time)

    const list = [1,2,3,4]

   

    //console.log('TOKENURI OPTION', JSON.parse(localStorage.getItem(this.props.tokenURI)))
    console.log('NEW distancee_seconds', distancee_seconds)
    let x = setInterval(() => {
      console.log('Interval triggered');
      
      let curr_date = new Date()
      let input_date = JSON.parse(localStorage.getItem(this.props.tokenURI)).input_date 
      let in_date_sec = new Date(input_date);
      let curr_date_sec = new Date(curr_date);

      let final_sec = in_date_sec.getTime()

      console.log('input_date in timer ->', input_date);

      console.log('FIRST distancee_seconds->', distancee_seconds);
    
      distancee_seconds = distancee_seconds + 1000

      console.log('SECOND distancee_seconds->', distancee_seconds);

      let distance = final_sec - distancee_seconds

      console.log('INTERVAL TIME->', distance);

      localStorage.setItem(this.state.tokenID, distance)

      {console.log("get item data->",localStorage.getItem(this.state.tokenID))}

      let new_distance = localStorage.getItem(this.state.tokenID);

      console.log('new_distance TIME->', distance);


      const days = Math.floor(distance/ (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      const _time = distancee_seconds
      const _object = {_time, input_date, days, hours, minutes, seconds}

      console.log( "days--->", days, "hours ----->", hours, "minutes ---->", minutes, "seconds ----->", seconds)

      localStorage.setItem(this.props.tokenURI, JSON.stringify(_object))

      console.log("SET IS STATED !!!")
      this.setState({
        timer_days: days,
        timer_hour: hours,
        timer_minutes: minutes,
        timer_seconds: seconds,
          auction_status: true
      })
     

    //   this.return_time(days, hours, minutes, seconds)

      if (new_distance <= 0 ){
        clearInterval(x);
      }


      

      
    }, 1000); 
        
  }

  componentDidMount = () =>{
    this.get_image_URI()
        console.log("TOKEN ID RENDERED", this.state.tokenID)

        console.log("MOUNTED URI")

        if(JSON.parse(localStorage.getItem(this.props.tokenURI)) != null){
            this.function_curr_time()
      }
  }

  run_interval = () =>{
    if(JSON.parse(localStorage.getItem(this.props.tokenURI)) != null){
      this.function_curr_time()
    }else{
        console.log("Empty interval")
    }
  }
  
  return_time = () =>{
      if(JSON.parse(localStorage.getItem(this.props.tokenURI)) != null){

        console.log("inside return time---> ",JSON.parse(localStorage.getItem(this.props.tokenURI)))
        const new_time = JSON.parse(localStorage.getItem(this.props.tokenURI))._time + 1000 

        let x = setInterval(() => {

            console.log("NEW TIME---> ",new_time)
            

            const _days = Math.floor(new_time/ (1000 * 60 * 60 * 24));
            const _hours = Math.floor((new_time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            const _minutes = Math.floor((new_time % (1000 * 60 * 60)) / (1000 * 60));
            const _seconds = Math.floor((new_time % (1000 * 60)) / 1000); 

            this.setState({
                timer_days: Math.floor(new_time/ (1000 * 60 * 60 * 24)),
                timer_hour: Math.floor((new_time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))),
                timer_minutes: Math.floor((new_time % (1000 * 60 * 60)) / (1000 * 60)),
                timer_seconds: Math.floor((new_time % (1000 * 60)) / 1000),
            })
            this.get_div_time(_days, _hours, _minutes, _seconds)
            
        }, 1000)
      }

  }

  get_div_time = (_days, _hours, _minutes, _seconds) =>{
    return(
        <div>
            
              <h3>Days: {this.state.timer_days}
              Hour: {this.state.timer_hour}
              Minutes: {this.state.timer_minutes}
              Seconds: {this.state.timer_seconds}</h3>
        </div>

    )
  }

  handleclose = () =>{
    console.log("closed")

    this.setState({
      open: false
    })
  }     

  handle_date = (e) =>{
    console.log("input_date", e.target.value)
    this.setState({
      input_date : e.target.value
    })
  }

  handle_open = () =>{
    console.log("ITS OPEN")
    this.setState({
      open:true
    })
  }

  render(){
    const { classes } = this.props;

  return (
    <div className="App">
          <div>

          <Button
          
          onClick={()=>{
                         
                       
                          this.handle_open()
                          }} color="primary">
                      Auction
                      </Button>

                      <Dialog
                open={this.state.open}
                
                style={{ cursor: 'move', overflow: 'auto', height: '100%' }}
            ><DialogTitle style={{ cursor: 'pointer'}}>
                <DialogContent>

            <h3>Auction</h3>  
          
             <p> Enter time-stamp and allow users to bid on your NFT</p>
    

            
             <h3>Select Timer</h3>
             <TextField 
                            id="datetime-local"
                         
                            type="datetime-local"
                            defaultValue={new Date()}
                            variant="outlined"
                            margin="normal"
                           
                            required 
                            fullWidth 
                          
                            autoFocus 
                            onChange={this.handle_date}
                        />

                        <DialogActions>
            <Button className={classes.button} autoFocus onClick={()=>{
                this.loadblockchain_get_tokenid()
                  

                  // this.loadblockchain_get_nft()
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
        
         {/* {this.get_div_time()} */}
            { <h3>Days: {this.state.timer_days} Hour: {this.state.timer_days} Minutes: {this.state.timer_minutes} Seconds: {this.state.timer_seconds}</h3> }
          </div>
      </div>
  );
}
}

export default withStyles(styles) (Timer);