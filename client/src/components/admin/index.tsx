import { Box, makeStyles, Theme} from "@material-ui/core";
import { useEffect, useState } from "react";
import { RestaurantTableData } from "../../types/types";
import TablesEditor from "./Tables";

interface Iprops {
  restaurantId: RestaurantTableData
}

function AdminIndex({restaurantId}: Iprops) {

  //log in as owner
  //

  return (
   <Box>
      <TablesEditor restaurantId={restaurantId}/>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default AdminIndex; 