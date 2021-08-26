import * as React from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF"];

export const MenuItem = ({ i }) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>

<motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-placeholder" style={style}/>
      <Link  to ={{pathname: `/`}} className = "text-placeholder" style={{textDecoration: 'none'}}>Home </Link>
    </motion.li>


    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-placeholder" style={style} />
      <Link  to ={{pathname: `/market`}} className = "text-placeholder" style={{textDecoration: 'none'}}>Market </Link>
    </motion.li>

    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-placeholder" style={style}/>
      <Link  to ={{pathname: `/create`}} className = "text-placeholder" style={{textDecoration: 'none'}}>Create NFT </Link>
    </motion.li>

    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-placeholder" style={style}/>
      <Link  to ={{pathname: `/register`}} className = "text-placeholder" style={{textDecoration: 'none'}}>Connect  </Link>
    </motion.li>

    
    </div>
  );
};