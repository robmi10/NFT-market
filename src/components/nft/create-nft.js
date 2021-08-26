import '../../App.scss';
import React from "react";
import {withStyles } from '@material-ui/core/styles';
import {Grid, AppBar, Toolbar, InputBase, 
  IconButton, Button, TextField, Dialog, DialogTitle,
   DialogContent, DialogActions, Paper, Typography, Fab} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Metamask from '../wallets/metamask'
import Protis from '../wallets/protis'
import Walletconnect from '../wallets/walletconnect';
import AddIcon from '@material-ui/icons/Add';
import Single from "./single-nft"
import ipfs from "../ipfs"
import Web3 from 'web3'
import {CONTRACT_ADRESS, HTTP_PROVIDER} from '../config.js'
import NftExample from "../../contracts/NftExample.json";

   const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper:{
      color: "rgb(83, 110, 233)",
      background: "rgb(253, 253, 253)",
      boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
      borderRadius: 10,
      height: 300,
      padding: 20,
      marginTop: 10,
      width: 350,
      position: 'relative',
               left: 0,
               top: 0,

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
    menuButton: {
      marginRight: theme.spacing(2),
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
 

class NFT extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        open:false,
        all_royalties: [5, 10, 20, 30, 40],
        buffer: null,
        ipfsHash: '',
        title: '',
        description: '',
        price: 0,
        royalties: '',
        sell_type: '',
        metadata: '',
        image: '',
        metadata_ipfsHash: '',
        username: '',
        time_input: 0,
        send_image: ''
    } 
  }

  loadblockchain_nft= async ()=>{
    console.log('INSIDE loadblockchain_register_truffle')
    const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = NftExample.networks[networkId];
    const contract = new web3.eth.Contract(
      NftExample.abi, CONTRACT_ADRESS
    );
    const accounts = await web3.eth.getAccounts()
    const chainId = await web3.eth.getChainId();
    

    console.log("Contract address --->", deployedNetwork)
    console.log("networkId --->", networkId)
    console.log("CONTRACT_ADRESS --->", CONTRACT_ADRESS)
    
    console.log("account --->", this.state.account.toString())

    console.log("metadata_ipfsHash --->", this.state.metadata_ipfsHash)

    console.log("username --->", this.state.username)


    const Transaction = await contract.methods.mintNft(this.state.account.toString(), this.state.metadata_ipfsHash, this.state.username).send({from: accounts[0], gas: 5000000});
    
    alert("Your NFT is created");
}

componentDidMount = async() =>{
  const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
  const accounts = await web3.eth.getAccounts()

  this.setState({
      account: accounts
  })
}
  handle_open = () =>{
    console.log("ITS OPEN")
    this.setState({
      open:true
    })
  }

  handleclose = () =>{
    console.log("closed")

    this.setState({
      open: false
    })
  }

  handle_file = (event) =>{
    
    console.log("Inside handle file")

    console.log("Image", this.state.image)
    var file = this.state.image.files[0];
    var reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () =>{
      this.setState({
        buffer: Buffer(reader.result)
        
      })

      ipfs.files.add(this.state.buffer, (error, result) => {
        if(error) {
          console.error(error)
          
        }
  
          this.setState({ image: result[0].hash })
          console.log("image->", this.state.image)
          this.handle_metadata()
      })

      
    }
      
  }

  handle_metadata = () =>{
    const curr_image = 'https://ipfs.io/ipfs/' + this.state.image
    const new_image = JSON.stringify(curr_image)

    

    const metadata = {
      "title": this.state.title,
      "description": this.state.description,
      "price": this.state.price,
      "royalties": this.state.royalties,
      "image": new_image
    }

    

    console.log("inside ipfsHash", this.state.ipfsHash)
    console.log("inside metadata", metadata)

    ipfs.files.add(Buffer.from(JSON.stringify(metadata)))
  .then(res => {
    this.setState({
      metadata_ipfsHash: "https://ipfs.io/ipfs/" + res[0].hash,
      open:false,
      send_image: new_image
    })
    console.log('added data hash:', this.state.metadata_ipfsHash)

    this.loadblockchain_nft()
  })
  .then(output => {
    console.log('retrieved data:', JSON.parse(output))
  })
    
  }

  on_submit =()=>{
    console.log("On submit")
    ipfs.files.add(this.state.buffer, (error, result) =>{
      if(error){
        console.log(error)
        return
      }
      console.log("result-> ", result)
      this.setState({
        ipfsHash: result[0].hash,
        open: false
      })

      console.log("ipfsHash-> ", this.state.ipfsHash)
    })
  }

  field = () =>{
    console.log("inside field")
    if(this.state.open == true){
    return(
      <div>
        <Single></Single>
      </div>
    )
  }
  }

  handle_title = (e) => {
    this.setState({
      title: e.target.value
    })
    }

  handle_description = (e) => {
      this.setState({
        description: e.target.value
      })
      }
  
  handle_price = (e) => {
      this.setState({
          price: e.target.value
        })
        }
  
  handle_royalties = (e) => {
      this.setState({
         royalties: e.target.value
          })
          }
  handle_selltype = () =>{
    this.setState({
      sell_type: "Fixed Price"
    })
  }

  handle_selltype_2 = () =>{
    this.setState({
      sell_type: "Timed auction"
    })
  }

  handle_image = (e) =>{
    this.setState({
      image: e.target
    })
  }
  render(){
    const { classes } = this.props;

  return (
    <div className="App">
    
        <h1>Create NFT</h1>

        <Grid container className={classes.root} >
            
        <Grid  container justify="center">
        <Paper className={classes.paper}>
        <div className ="center">
                <div className ="h1register">
                <h2 style= {{ alignItems: "left"}} >Single</h2>
                <h3 className ="h2new">Create a single NFT with only exemplar</h3>
                </div>
        </div>

        <Button>
        <Fab color="secondary" aria-label="add" onClick={this.handle_open}>
                            <AddIcon />
                            </Fab>
                        </Button>
        </Paper>
        
        </Grid>

        </Grid>

        <Dialog
                open={this.state.open}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                style={{ cursor: 'move' }}
            ><DialogTitle style={{ cursor: 'pointer', overflow: "hidden"}} id="draggable-dialog-title">
                <DialogContent>
              <h3>Upload file</h3>
              <p>PNG, GIF, WEBP, MP4 or MP3. Max 30mb.</p>
             <TextField 
                            variant="outlined"
                            margin="normal"
                            required 
                            fullWidth 
                            type = "file"
                            autoFocus 
                            onChange={this.handle_image}
                        />       
            <h3>Put on marketplace</h3>
             <p> Enter price to allow users instantly purchase your NFT</p>
            
             <h3>Title</h3>
             <TextField 
                            variant="outlined"
                            margin="normal"
                           
                            required 
                            fullWidth 
                            label="e. g. Redemable chelsea shirt"
                            autoFocus 
                            onChange={this.handle_title}
                        />

            <h3>Description</h3>
              <TextField 
                            variant="outlined"
                            margin="normal"
                          
                            required 
                            fullWidth 
                            label="e. g. After buying you will get a signed shirt"
                            autoFocus 
                            onChange={this.handle_description}
                        />

              <h3>Price</h3>
              <TextField 
                            variant="outlined"
                            margin="normal"
                          
                            required 
                            fullWidth 
                            label="Enter price"
                            autoFocus 
                            onChange={this.handle_price}
                        />

                <h3>Royalties</h3>
           

                      <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Royalty %"
                            onChange={this.handle_royalties}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="e. g. 10%, 20%, 30%"
                            variant="outlined"
                            >
                            {this.state.all_royalties.map((option) => (
                                <option>
                                    {option}
                                </option>
                            ))}
                        </TextField>

                        <DialogActions>
            <Button className={classes.button} autoFocus onClick={()=>{
              this.handle_file()
              this.on_submit()
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
      </div>
  );
}
}

export default withStyles(styles) (NFT);