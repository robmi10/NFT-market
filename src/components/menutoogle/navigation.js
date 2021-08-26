import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./menuitem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const Navigation = () => (
  <motion.ul variants={variants}>
    {itemIds.map(i => (
      <MenuItem i={i} key={i} >
        
      </MenuItem>
    ))}
  </motion.ul>
);

const itemIds = [0];

export default Navigation