import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import DataContext from "../../DataContext/DataContext";

const RecipeSearchForm = () => {
  const { search, setSearch, handleSearch } = useContext(DataContext);
  return (
    <Box>
      <Box component="form" textAlign={"center"} p={2} onSubmit={handleSearch}>
        <TextField
          type="text"
          placeholder="Search"
          size="small"
          variant="outlined"
          color="secondary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            background: "lightgray",
            px: "0.8px",
            py: "1px",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default RecipeSearchForm;
