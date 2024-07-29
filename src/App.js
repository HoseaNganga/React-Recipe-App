import { Container } from "@mui/material";
import {
  FavoriteFoodContainer,
  PopUpContainer,
  RandomMealContainer,
  RecipeSearchForm,
} from "./components";
import DataContext, { DataProvider } from "./DataContext/DataContext";
import { useContext } from "react";

function App() {
  const { isHidden } = useContext(DataContext);
  return (
    <>
      <DataProvider>
        <Container
          opacity={isHidden ? "1" : "0.3"}
          sx={{
            boxShadow: "0px 5px 5px black",
            background: "white",
            borderRadius: "10px",
            width: "400px",
          }}
        >
          <RecipeSearchForm />
          <FavoriteFoodContainer />
          <RandomMealContainer />
        </Container>
        <PopUpContainer />
      </DataProvider>
    </>
  );
}

export default App;
