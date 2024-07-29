import React, { useContext } from "react";
import { Paper, Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DataContext from "../../DataContext/DataContext";

const PopUpContainer = () => {
  const { isHidden, popUpMeal, setIsHidden } = useContext(DataContext);
  return (
    <Paper
      sx={{
        display: isHidden ? "none" : "grid",
        position: "fixed",
        top: 10,
        bottom: 0,
        right: 0,
        left: 0,
        placeItems: "center",
        zIndex: 20,
        background: "black",
      }}
      p={2}
    >
      <Box
        sx={{
          maxWidth: "600px",
          width: "auto",
          minHeight: "500px",
          maxHeight: "600px",
          overflowY: "scroll",
          position: "relative",
          overFlowX: "none",
          background: "white",
          /* transform: "translateY(2rem) */
        }}
        p={2}
      >
        <Button
          sx={{ position: "absolute", top: "10", right: "0" }}
          onClick={() => setIsHidden(true)}
        >
          <CloseIcon size="small" color="error" />
        </Button>
        {popUpMeal && (
          <Box>
            <Typography variant="h4" gutterBottom mt={3}>
              {popUpMeal.strMeal}
            </Typography>
            <img
              src={popUpMeal.strMealThumb}
              alt={popUpMeal.strMeal}
              style={{
                maxWidth: "100%",
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <Typography variant="body1">{popUpMeal.strInstructions}</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default PopUpContainer;
