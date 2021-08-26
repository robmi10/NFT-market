import '../App.css';
import React from "react";
import {withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Web3 from 'web3'
import {CONTRACT_ADRESS, HTTP_PROVIDER} from '../components/config'
import NftExample from "../contracts/NftExample.json";
import axios from 'axios';
import firebase_init from "../firebase"
import Timer from "./nft/timer"
import Jdenticon from 'react-jdenticon';
import { animateScroll as scroll} from 'react-scroll'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  paper:{
    color: "rgb(83, 110, 233)",
    background: "rgb(253, 253, 253)",
    boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
    borderRadius: 10,
    height: 430,
    padding: 20,
    marginTop: 20,
    width: 350,
    position: 'relative',
             left: 0,
             top: 0,
             cursor: 'pointer',
             '&:hover': {
             boxShadow: '0 10px 5px 2px rgba(255, 105, 135, .3)',
             },
             "&:focus" :{
             outline: "none",
             } 

},
gridList: {
  width: 2000,
  height: 1200,
  marginTop: 20,

},
button: {
  color: "white",
  background: "#6851ff",
  width: 100,
  borderRadius: 40,
  boxShadow: 0,
  height: 50,

  
   },
  centri: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },

  new: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    justifyContent: 'center',
  },

paper2:{
  background: "rgb(253, 253, 253)",

  borderRadius: 15,
  height: 100,
  padding: 20,
  marginTop: 10,
  width: 70,
  position: 'relative',
           left: 0,
           top: 0,
  
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


class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      nft_list: [],
      data : [],
      title: "",
      description: "",
      price: "",
      royalties:"",
      image: "",
      curr_on: false,
      length_: 0,
      status: false,
      open: false,
      timer_date: 0,
      input_date: 0,

      interval: null,

      timer_days: 0,
      timer_hour: 0,
      timer_minutes: 0,
      timer_seconds: 0,
      auction_time:0,
      distance: 0,

      tokenURI: "",
      tokenID: 0,
      curr_data_time: 0,
      got_firebase: false,
      auction_status: false,

      scrollbars: React.createRef()
    }

    this.firebase_func = this.firebase_func.bind(this)

  }

  componentDidMount(){
    this.loadblockchain_get_nft()
    
  }

  loadblockchain_get_nft= async ()=>{
    const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = NftExample.networks[networkId];
    const contract = new web3.eth.Contract(
      NftExample.abi, CONTRACT_ADRESS
    );
    const accounts = await web3.eth.getAccounts()
    const chainId = await web3.eth.getChainId();
    const OWNERTRANSCATION = await contract.methods.get_id_uri(this.props.location.state.eth_address).call();

      this.setState({
        nft_list: OWNERTRANSCATION.filter(item => item.token_uri)
      })

      this.test_get_nfts()

  }

  loadblockchain_get_tokenid= async (curr_token_URI)=>{
    const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = NftExample.networks[networkId];
    const contract = new web3.eth.Contract(
      NftExample.abi, CONTRACT_ADRESS
    );
    const accounts = await web3.eth.getAccounts()
    const chainId = await web3.eth.getChainId();

    const Transaction = await contract.methods.get_user_tokenID(curr_token_URI).call();
    this.setState({
        tokenID: Transaction
    })
  }
  
  firebase_func = (timer) =>{
    const a = firebase_init.database().ref("nft-auction");

    console.log(a)

    let timer_new = timer * 1000
    const curr_addr = this.props.location.state.eth_address
    
    a.push(
     {
        eth_addr: curr_addr,
        id: this.state.tokenID,
        Date: timer_new.toString()
      }
    )

    
    let curr_id = this.state.tokenID;
    
    const Query = a.orderByChild('eth_addr').equalTo(curr_addr.toString());

    let curr_datatime = ""
    //const QueryB = a.orderByChild('id').equalTo(timer_new.toString());
    Query.on('value', function (snapshot) {
      snapshot.forEach((data) => {
        const curr_data = ""
        if (data.val().id == 0){
          console.log("Every data",data.val().id)
           curr_data = data.val().id
        }

        this.setState({
          curr_datatime: data.val().id,
          got_firebase: true
      })
        })
      
  });
  }


  
    test_get_nfts = () =>{
        axios.all(this.state.nft_list.map(l => axios.get(l.token_uri)))
          
          .then((res) => {
            
            this.setState({
              data: res
            })
          });

    }

    handleclose = () =>{
      this.setState({
        open: false
      })
    }

    handle_open = () =>{
      this.setState({
        open:true
      })
    }

    handle_date = (e) =>{
      this.setState({
        input_date : e.target.value
      })
    }

    get_seconds(distancee){  
      let distancee_seconds =distancee * 1000

      let x = setInterval(() => {
        let curr_date = new Date()
        let input_date = this.state.input_date.toString()
        let in_date_sec = new Date(input_date);
        let curr_date_sec = new Date(curr_date);
  
        let final_sec = in_date_sec.getTime()
        distancee_seconds = distancee_seconds + 1000
        let distance = final_sec - distancee_seconds

        const days = Math.floor(distance/ (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (distance <= 0 ){
          clearInterval(x);
        }
        
        
        
        return(
            
          <div>
            <h3>Days: {days} Hour: {hours} Minutes: {minutes} Seconds: {seconds}</h3>
          </div>
        )
        
      }, 1000);
      

    }
 

  scrollToTop() {
    scroll.scrollToTop();
  }

  filter_search = () =>{
    const { classes } = this.props;

    if(this.props.search_input != ''){
      return(

        <GridList  cellHeight={500} className={classes.gridList} style ={{ position: 'relative',
               left: 1070,
               top: 100,
               display:'flex',
               overflow: 'auto',
               }} 
              ref = {this.state.scrollbars}
               onClick ={this.scrollToTop3}
               cols={4}>

     
    {this.state.data.filter(search => search.data.title ==  this.props.search_input).map( (option, i)=> 
           
           <GridListTile key={option.data.title}> 
       
            <div className={classes.paper}>
              
              <h3>title: {option.data.title}</h3>
              <h3>description: {option.data.description}</h3>
              <h3>price: {option.data.price}</h3>
              <h3>royalties: {option.data.royalties}</h3>

              <img style ={{height: 150, witdh: 150}} src ={option.data.image.replace(/['"]+/g, '')}></img>


              
          
              
              { <Timer eth_addr = {this.props.location.state.eth_address} tokenURI = {option.config.url} key={i}> </Timer> }
            </div>
     
           </GridListTile>
            )}
       
        </GridList>
      )
    }
    else{
      return(

        <GridList  cellHeight={500} className={classes.gridList} style ={{ position: 'relative',
               left: 330,
               top: 100,
               display:'flex',
               overflow: 'auto',
               }} 
              ref = {this.state.scrollbars}
               onClick ={this.scrollToTop3}
               cols={4}>

     
    {this.state.data.map((option, i) => (
           
           <GridListTile key={i}> 
       
            <div className={classes.paper}>
              
              <h3>title: {option.data.title}</h3>
              <h3>description: {option.data.description}</h3>
              <h3>price: {option.data.price}</h3>
              <h3>royalties: {option.data.royalties}</h3>

              <img style ={{height: 150, witdh: 150}} src ={option.data.image.replace(/['"]+/g, '')}></img>


              
          
              
              { <Timer eth_addr = {this.props.location.state.eth_address} tokenURI = {option.config.url} key={i}> </Timer> }
            </div>
     
           </GridListTile>
            ))}
       
        </GridList>
      )
    }
  }

  render(){

  const { classes } = this.props;
  return (
  <div className ="App">
  
    <h1>Owner</h1>
    
    <div className ={classes.new}>
      <h2>{this.props.eth_address.substr(0,10)} <Jdenticon size="30" value={this.props.eth_address} /></h2> 
    </div>
    <h1>Collection</h1>
    {this.filter_search()}

  </div>

  );
}
}

export default withStyles(styles) (Profile);