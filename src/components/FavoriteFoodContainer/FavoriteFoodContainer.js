import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DataContext from "../../DataContext/DataContext";

const FavoriteFoodContainer = () => {
  const { favoriteMeals, handleDeleteFavMeal, handlePopUp } =
    useContext(DataContext);
  return (
    <Box p={2} sx={{ background: "rgb(243, 225, 255)", height: "auto" }} mb={2}>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        textAlign={"center"}
        gutterBottom
      >
        Favorite Meals
      </Typography>
      <Box
        display="flex"
        justifyContent={"space-around"}
        gap={3}
        flexWrap={"wrap"}
      >
        {favoriteMeals.map((meal) => (
          <Box
            key={meal.idMeal}
            width="80px"
            height={"80px"}
            sx={{
              display: "grid",
              placeItems: "center",
              position: "relative",
              cursor: "pointer",
            }}
            className="favFoodContainer"
            onClick={() => handlePopUp(meal)}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="favFoodImg"
            />
            <Typography variant="body2">{`${meal.strMeal.slice(
              0,
              6
            )}...`}</Typography>
            <Button
              className="favFoodButton"
              sx={{
                position: "absolute",
                top: "-10px",
                right: "-34px",
                transform: "translateX(10px)",
                display: "none",
                transition: "0.3s ease-in-out",
              }}
              onClick={() => handleDeleteFavMeal(meal.idMeal)}
            >
              <CloseIcon size="small" color="error" />
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FavoriteFoodContainer;
