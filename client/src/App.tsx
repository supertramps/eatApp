import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/hero/Hero";
import Login from "./components/login/Login";
import RestaurantMenu from "./components/restaurantMenu/Menu";
import CreateUser from "./components/login/CreateUser";
import Checkout from "./components/checkout/Checkout";
import { UserAuthContext } from "./context/UsersContext";
import UserPage from "./components/users/UserPage";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { RestaurantTableData } from "./types/types";
import AdminIndex from "./components/admin";
import TablesEditor from "./components/admin/Tables";
import QrGenerator from "./components/admin/QrGenerator";

function App() {
  const { loggedIn, userID, userInformation } = useContext(UserAuthContext);
  const [currentTableAndRestaurant, setcurrentTableAndRestaurant] =
    useState<RestaurantTableData | null>(null);
  const [table, setTable] = useState<any>("");

  useEffect(() => {
    let restaurant = JSON.parse(localStorage.getItem("restaurant") || "{}");
    setcurrentTableAndRestaurant(restaurant);
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#75A0F5",
        light: "#FFF",
      },
      secondary: {
        main: "#E33E7F",
      },
    },
  });

  useEffect(() => {
    console.log("is logged in", loggedIn);
  }, []);

  const selectedTable = (table: any) => {
    setTable(table);
  };

  //get it working so that if you are an owner and you navigate to /menu you come to the menu, as opposed to using an id
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Hero restaurantId={currentTableAndRestaurant!} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route
            path={`/menu/:id`}
            element={
              <RestaurantMenu
                restaurantId={currentTableAndRestaurant!}
                userInfo={userInformation}
              />
            }
          />
          <Route path={`/user/${userID}`} element={<UserPage />} />
          <Route
            path="/checkout/"
            element={<Checkout restaurantId={currentTableAndRestaurant!} />}
          />
          <Route
            path="/admin"
            element={<AdminIndex userInfo={userInformation} />}
          />
          <Route
            path="/tables"
            element={
              <TablesEditor
                selectedTable={selectedTable}
                restaurantTable={currentTableAndRestaurant!}
                userInfo={userInformation}
              />
            }
          />
          <Route
            path="/tables/:id"
            element={<QrGenerator table={table} userInfo={userInformation} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
