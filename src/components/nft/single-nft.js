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
   const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper:{
      color: "rgb(83, 110, 233)",
      background: "rgb(253, 253, 253)",
      boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
      borderRadius: 40,
      height: 300,
      padding: 20,
      marginTop: 10,
      width: 350,
      position: 'relative',
               left: 0,
               top: 0,

  },
  button: {
    width: 300,
    borderRadius: 40,
    boxShadow: 0,
    height: 100,

    cursor: 'pointer',
     },
}
  )
 

class Single extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
 
    }
  }

  render(){
    const { classes } = this.props;

  return (
    <div className="App">
        <Dialog
                open={this.state.open}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            ><DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                <DialogContent>
                
             <TextField 
                            variant="outlined"
                            margin="normal"
                            required 
                            fullWidth 
                            label="Product"
                            autoFocus 
                            onChange={this.handle_product}
                        />       
                        
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Quality grade"
                            onChange={this.handle_quality}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select your qualty grade"
                            variant="outlined"
                            >
                            {this.state.Quality.map((option) => (
                                <option>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Shipped"
                            onChange={this.handle_shipped}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select shipping status"
                            variant="outlined"
                            >
                            {this.state.Shipped.map((option) => (
                                <option>
                                    {option}
                                </option>
                            ))}
                        </TextField>

                        <DialogActions>
            <Button autoFocus onClick={this.handleclose} color="primary">
                Cancel
            </Button>
            <Button autoFocus  onClick={()=>{
                           
                        }} color="primary">
                Submit
            </Button>
        </DialogActions>
        </DialogContent>
        </DialogTitle>
        </Dialog>
        
      </div>
  );
}
}

export default withStyles(styles) (Single);