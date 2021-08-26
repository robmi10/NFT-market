import '../App.css';
import React from "react";
import {withStyles } from '@material-ui/core/styles';
import { Paper} from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Slider from "react-slick";
import Carousel from 'react-elastic-carousel';
import { motion, AnimatePresence  } from "framer-motion"
import {CONTRACT_ADRESS, HTTP_PROVIDER} from '../components/config'
import Web3 from 'web3'
import NftExample from "../contracts/NftExample.json";
import axios from 'axios';
import Timer_2 from '../components/nft/timer_2'
import Bid from '../components/nft/bid'
import Buy from '../components/nft/buy'
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  paper:{
    background: "rgb(253, 253, 253)",
    boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
    borderRadius: 2,
    height: 250,
    padding: 20,
    marginTop: 20,
    width: 300,
    position: 'relative',
             left: 0,
             top: 0,
             cursor: 'pointer',
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

   gridnew:{
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
  }
);


class Market extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      nft_list: [],
      data: [],
      auction_list: [],
      addr_list: [],
      timer_days: 0,
      timer_hour: 0,
      timer_minutes: 0,
      timer_seconds: 0,
    }
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
    const Transaction = await contract.methods.get_token_counter().call();

    const OWNERTRANSCATION = await contract.methods.getBid().call();
    var TokenURI_Array = OWNERTRANSCATION.map(function(item) {
      return {uri: item.token_uri, addr: item.address_}
    })
   

      this.setState({
        nft_list: TokenURI_Array,
      })
    this.get_nfts()


  }

  
  loadblockchain_get_all_auction= async ()=>{
    const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = NftExample.networks[networkId];
    const contract = new web3.eth.Contract(
      NftExample.abi, CONTRACT_ADRESS
    );

    const accounts = await web3.eth.getAccounts()
    const chainId = await web3.eth.getChainId();
    const Transaction = await contract.methods.get_all_auctions_().call();

    var TokenURI_Array = Transaction.map(function(item) {
      return {image: item.image, Bider: item.Bider,  tokenID: item.tokenID,  benecifiary: item.benecifiary,
        token_URI: item.token_URI, status: item.status,
      }
    })
    this.setState({
      auction_list: Transaction
    })
  }

  componentDidMount(){
    this.loadblockchain_get_nft()
    this.loadblockchain_get_all_auction()

  
  }

  get_nfts = () =>{
      axios.all(this.state.nft_list.map(l => axios.get(l.uri)))
      .then((res) => {

        this.setState({
          data: res
        })
       
      });

}

handle_open (){
  this.setState({
    open: true
  })
}

filter_market = ()=>{

  const { classes } = this.props;
  const i = 0;
  if(this.props.search_input != ''){

  return(
    <GridList cellHeight={500} className={classes.gridList} style ={{ position: 'relative',
               left: 1070,
               top: 0,
               display:'flex',
               }} cols={1}>
     
    {this.state.data.filter(search => search.data.title == this.props.search_input).map(option =>(
           
           <GridListTile key={option.data.title}> 
       
            <div className={classes.gridnew}>
              
              <h3>title: {option.data.title}</h3>
              <h3>description: {option.data.description}</h3>
              <h3>price: {option.data.price}</h3>
              <h3>royalties: {option.data.royalties}</h3>

              <img style ={{height: 150, witdh: 150}} src ={option.data.image.replace(/['"]+/g, '')}></img>

              <Buy  price = {option.data.price} description = {option.data.description} title = {option.data.title} 
                        image = {option.data.image} addr = {this.state.nft_list[i].addr} tokenURI = {this.state.nft_list[i].uri}
                  />

              <div>       
                      </div>

            </div>
     
           </GridListTile>
            ))}
       
        </GridList>
  )}
  else{
    return(

      <GridList cellHeight={500} className={classes.gridList} style ={{ position: 'relative',
               left: 330,
               top: -30,
               display:'flex',
               }} cols={4}>
     
    {this.state.data.map((option, i) => (
           
           <GridListTile key={i}> 
       
            <div className={classes.gridnew}>  
              <h3>title: {option.data.title}</h3>
              <h3>description: {option.data.description}</h3>
              <h3>price: {option.data.price}</h3>
              <h3>royalties: {option.data.royalties}</h3>

              <img style ={{height: 150, witdh: 150}} src ={option.data.image.replace(/['"]+/g, '')}></img>

              <Buy  price = {option.data.price} description = {option.data.description} title = {option.data.title} 
                        image = {option.data.image} addr = {this.state.nft_list[i].addr} tokenURI = {this.state.nft_list[i].uri}
                  />
            
              <div>       
                      </div>

            </div>
     
           </GridListTile>
            ))}
       
        </GridList>

    )
  }
}

go_to_bid (){
  return(
    <Bid handle_open = {this.handle_open} ></Bid>
  )
}
 
get_auction_time = (url) =>{

  this.setState(
 {   
      timer_days: JSON.parse(localStorage.getItem(url)).days,
      timer_hour: JSON.parse(localStorage.getItem(url)).hours,
      timer_minutes: JSON.parse(localStorage.getItem(url)).minutes, 
      timer_seconds: JSON.parse(localStorage.getItem(url)).seconds 
 })
}


  render(){
    
    const { classes } = this.props;
    const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 2, itemsToScroll: 2 },
      { width: 768, itemsToShow: 3 },
      { width: 1200, itemsToShow: 4 }
    ];
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
  return (
    <div className="App">

        <div className ="h1register">
        <h1>Market</h1>
        {console.log("value input ->", this.props.search_input)}
        <h2 className ="h2new">Collections</h2>
        </div>

        <Carousel breakPoints={breakPoints} {...settings}
        >

      {   
                this.state.data.map( (item, i) =>
                
                  
                    <Paper>
                       <motion.div
                      whileHover={{ scale: 0.8, rotate: 360 }}
                      whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: "100%"
                      }}
                    >
                  
                  <img style ={{height: 150, witdh: 150}} src={item.data.image.replace(/['"]+/g, '')} />
              
                  <h1>{this.state.nft_list[i].addr.substr(0, 8)}</h1>
                  <h2 className ="h2new">{item.data.price} eth</h2>
                  </motion.div>

                 
                  <Buy  price = {item.data.price} description = {item.data.description} title = {item.data.title} 
                        image = {item.data.image} addr = {this.state.nft_list[i].addr} 
                        tokenURI = {this.state.nft_list[i].uri} eth_address = {this.props.eth_address}
                  />
                  
                  </Paper>
                 
                 )
            } 
            
      </Carousel>

    
      <div className ="h1register">
        <h2 className ="h2new">Most popular</h2>
        </div>


        <Carousel breakPoints={breakPoints} {...settings}
        >

{   
                this.state.data.map( (item, i) =>
                
                  
                    <Paper>
                       <motion.div
                      whileHover={{ scale: 0.8, rotate: 360 }}
                      whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: "100%"
                      }}
                    >
                  
                  <img style ={{height: 150, witdh: 150}} src={item.data.image.replace(/['"]+/g, '')} />
              
                  <h1>{this.state.nft_list[i].addr.substr(0, 8)}</h1>

                  <h2 className ="h2new">{item.data.price} eth</h2>
                  </motion.div>

                  <Buy  price = {item.data.price} description = {item.data.description} title = {item.data.title} 
                        image = {item.data.image} addr = {this.state.nft_list[i].addr} tokenURI = {this.state.nft_list[i].uri}
                  />                  
                  </Paper>
                 
                 )
            }
            
      </Carousel>


      <div className ="h1register">
        <h2 className ="h2new">Auction</h2>
        </div>


        <Carousel breakPoints={breakPoints} {...settings}
        >

{   
                this.state.auction_list.map( (item, i) =>

                    <Paper>
                       <motion.div
                      whileHover={{ scale: 0.8, rotate: 360 }}
                      whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: "100%"
                      }}
                    >
                  
                 <img style ={{height: 150, witdh: 150}} src={item.image.replace(/['"]+/g, '')} />
              
                   <h1>{item.benecifiary.substr(0, 8)}</h1>

                  <h2 className ="h2new">{item.Bidsize} eth</h2>
                  </motion.div>
                  
                  <Timer_2 token_URI = {item.token_uri} > </Timer_2>  


                  <Bid  Bider = {item.Bider} Bidsize = {item.Bidsize} 
                  benecifiary = {item.benecifiary} image = {item.image} 
                  tokenID = {item.tokenID} tokenURI = {item.token_uri}
                  />
                  
                  </Paper>
                 
                 )
                  
            }
            
      </Carousel>

      
      
      {this.filter_market()}

     
        </div>

  );
}
}

export default withStyles(styles) (Market);