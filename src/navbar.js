import './App.css';
import {withStyles } from '@material-ui/core/styles';
import React from 'react';
import {AppBar, Toolbar, InputBase, Typography} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Example from './components/menutoogle/test'
import Jdenticon from 'react-jdenticon';
import { Link } from 'react-router-dom'


const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    variants : {
      open: { opacity: 1, x: 0 },
      closed: { opacity: 0, x: "-100%" },
    }
  });

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: "circle(30px at 40px 40px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

class Navbar extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      open: false,
      curr_eth_addr: undefined,
      curr_input: ''
    }

  }

  handle_open = () =>{
    this.setState({
      open:true
    })
  }

  handle_search = (e) =>{
    this.setState({
      current_search : e.target.value
    })
    this.props.handleinputvalue_search(e.target.value); 
  }

  componentWillReceiveProps(){    
    this.setState({
      curr_eth_addr : this.props.eth_address
    })
  }


  render_navbar = () =>{
    const { classes } = this.props;
if(this.state.curr_eth_addr != undefined){
    return(
      <div className={classes.root}>
            <AppBar position="static" style = {{ background: "#6851ff"}}  onClickCapture ={()=>{
        
                
            }}>


              <Toolbar>
                <Typography className={classes.title}  align="left" variant="h6" noWrap>
                <Example  eth_address = {this.props.eth_address} />
                </Typography>

                <Typography className={classes.title}  align="right" variant="h6" noWrap>
                </Typography>

                <Typography>{this.props.eth_address.substr(0, 15)}
                      </Typography>
                <Link  to ={{pathname: `/profile`, state: {eth_address: this.props.eth_address}}}>
                <Jdenticon size="30" value={this.props.eth_address.substr(0, 15)} />   
                </Link>
                  
      
                
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onChange ={this.handle_search}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
                
              </Toolbar>
            </AppBar>
          </div>
            )
          }
else{
      return(
<div className={classes.root}>
      <AppBar position="static" style = {{ background: "#6851ff"}}>
        <Toolbar>       
          <Typography className={classes.title}  align="left" variant="h6" noWrap>
          <Example />
          </Typography>
          <Typography>
                </Typography>
            <Jdenticon size="30" /> 

          
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              
              onChange ={this.handle_search}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
      )
    }
  }
  render(){
    const { classes } = this.props;

  return (
    <div className={classes.root}>
        {this.render_navbar()}
        
      
      </div>
  );
}
}

export default withStyles (styles) (Navbar);