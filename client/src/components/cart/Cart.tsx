import { Box, makeStyles, Theme, Button, Typography, Divider} from "@material-ui/core";
import { SsidChartTwoTone } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import food from "../../food"
import MenuItems from "../menu/MenuItem"
import { CartContext } from "../../context/CartContext";

interface Iprops {
 
}

function Cart(props: Iprops) {
  const classes = useStyles();
  const { cart } = useContext(CartContext);

  return (
   <Box>
     <Typography 
      className={classes.cartText}
      variant="h5" 
      gutterBottom component="div"
     >
        Cart
      </Typography>
      {!cart.length ? 
        <Box className={classes.boxContainer}>
        <Typography variant="h4" gutterBottom component="div">
          Your cart is empty
        </Typography> 
        <Link to="/menu">
          <Typography variant="h4" gutterBottom component="div">
            Back to the menu yooo
          </Typography> 
        </Link>
        </Box>
        :
        <MenuItems menuItems = {cart}/>
      }
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  priceTotal: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 1rem 1rem 1rem"
  },
  align: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    width: "30%"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  cartText: {
    padding: "1rem 0rem 0rem 1rem"
  },
  boxContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
}));


export default Cart; 