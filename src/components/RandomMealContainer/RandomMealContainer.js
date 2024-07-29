import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardHeader,
  Collapse,
  Avatar,
  IconButton,
  styled,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DataContext from "../../DataContext/DataContext";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const vowels = ["a", "e", "i", "o", "u"];

const RandomMealContainer = () => {
  const {
    randomMeal,
    timeStamp,
    handlePushToLocalStorage,
    isActive,
    searchResults,
  } = useContext(DataContext);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      width={"100%"}
      height={"auto"}
      background="white"
      display="grid"
      placeitems="center"
      p={1}
      position="relative"
    >
      {randomMeal && (
        <Box width="100%" sx={{ marginBottom: "2rem" }}>
          <Card sx={{ maxWidth: "400px" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ backgroundColor: "red" }} aria-label="recipeBtn">
                  {randomMeal.strMeal.slice(0, 1).toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={randomMeal.strMeal}
              subheader={timeStamp}
            />
            <CardMedia
              component="img"
              height="194"
              image={randomMeal.strMealThumb}
              alt={randomMeal.strMeal}
            />
            <CardContent>
              <Typography variant="body1" color="info">
                {randomMeal.strMeal} is{" "}
                {vowels.includes(randomMeal.strArea[0].toLowerCase())
                  ? "an"
                  : "a"}{" "}
                {randomMeal.strArea} dish and its categorized as a{" "}
                {randomMeal.strCategory} meal.Click the open action button to
                view recipe details or Favorite button to add Meal as Favorite.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                onClick={() => handlePushToLocalStorage(randomMeal.idMeal)}
              >
                <FavoriteIcon color={isActive ? "error" : "info"} />
              </IconButton>
              <IconButton>
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>{randomMeal.strInstructions}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Box>
      )}
      {searchResults.length > 0 &&
        searchResults.map((randomMeal) => (
          <Box width="100%" key={randomMeal.strMeal}>
            <Card sx={{ maxWidth: "400px" }}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ backgroundColor: "red" }}
                    aria-label="recipeBtn"
                  >
                    {randomMeal.strMeal.slice(0, 1).toUpperCase()}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={randomMeal.strMeal}
                subheader={timeStamp}
              />
              <CardMedia
                component="img"
                height="194"
                image={randomMeal.strMealThumb}
                alt={randomMeal.strMeal}
              />
              <CardContent>
                <Typography variant="body1" color="info">
                  {randomMeal.strMeal} is{" "}
                  {vowels.includes(randomMeal.strArea[0].toLowerCase())
                    ? "an"
                    : "a"}{" "}
                  {randomMeal.strArea} dish and its categorized as a{" "}
                  {randomMeal.strCategory} meal.Click the open action button to
                  view recipe details or Favorite button to add Meal as
                  Favorite.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  onClick={() => handlePushToLocalStorage(randomMeal.idMeal)}
                >
                  <FavoriteIcon color={isActive ? "error" : "info"} />
                </IconButton>
                <IconButton>
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    {randomMeal.strInstructions}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Box>
        ))}
    </Box>
  );
};

export default RandomMealContainer;
