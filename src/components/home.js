import '../App.scss';
import React from "react";
import {withStyles } from '@material-ui/core/styles';
import {Grid, AppBar, Toolbar, InputBase, 
  IconButton, Button, TextField, Dialog, DialogTitle,
   DialogContent, DialogActions, Paper, Typography} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { motion, AnimatePresence  } from "framer-motion"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {images} from "./images-data"

const styles = theme => ({
  root: {
    flexGrow: 1,
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
     },
  }
);

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      curr_picture: 0,
    }

  }
  

  change_image = () =>{
      console.log("Change image")

      if (this.state.curr_picture < images.length - 1){
        const curr_pic = this.state.curr_picture + 1
        this.setState({
          curr_picture: curr_pic
        })
      }
      else if (this.state.curr_picture > images.length - 1){
        const curr_pic = this.state.curr_picture -1
        this.setState({
          curr_picture: curr_pic
        })
      }else{
        this.setState({
          curr_picture: 0
        })
      }
  }


  render(){
    const { classes } = this.props;
  return (
    <div className="App">
      <div className ="h1new">
    {/*     {this.change_image()} */}
        <h1>Own Your Art</h1>
        <h2 className ="h2new">Dont let nobody else own your art, take whats yours!</h2>
        <motion.button className="buttonnew"
    whileHover={{  scale: 1.1 }}
    whileTap={{  scale: 0.9 }}
  >
            
     <p>Lets Start</p>

          </motion.button>       
          </div>
          <Grid 
          container 
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style ={{ position: 'relative',
               left: 1000,
               top: -600,
               width: 200, height: 200
                 }}>
      
      <AnimatePresence>
    <motion.img style = {{ width: 300, height: 300,  top: 100,}}
      key={images[this.state.curr_picture]}
      src={images[this.state.curr_picture]}
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
     
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onMouseOver ={this.change_image}
    />
  </AnimatePresence>


  </Grid>
      </div>
  );
}
}

export default  withStyles (styles) (Home);