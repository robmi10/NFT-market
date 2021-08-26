import './App.css';
import React from "react";
import Navbar from "./navbar.js";
import Home from "./components/home.js";
import Register from "./components/register.js"
import Market from "./components/market.js"
import NFT from "./components/nft/create-nft"
import Profile from "./components/profile"
import {BrowserRouter as  Switch, Route} from 'react-router-dom';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      eth_address: ""
    }
  }

  handleinputvalue_addr = (addr)=>{
    this.setState({
      eth_address: addr,
      search_input: ''
    })
  }
  
  
  handleinputvalue_search = (input)=>{
    this.setState({
      search_input: input
    })
  } 

  render(){
  return (
    <div className="App">
      <Switch>
      <Navbar eth_address = {this.state.eth_address} handleinputvalue_search = {this.handleinputvalue_search.bind(this)}
          ></Navbar>
    
      <Route exact path = "/" component = {Home}/> 

      <Route path="/register" render={props => <Register handleinputvalue_addr = {this.handleinputvalue_addr.bind(this)} />} />

      <Route
      path='/market'
      render={(props) => <Market eth_address = {this.state.eth_address} search_input = {this.state.search_input}/>}
    />
      
      <Route path="/profile" render={(props) => <Profile {...props} eth_address = {this.state.eth_address} search_input = {this.state.search_input}/>} />
      <Route exact path = "/create" component = {NFT}/> 
      </Switch> 
      </div>
  );
}
}

export default App;
