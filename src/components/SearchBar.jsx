import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "../assets/styles/SearchBar.css";

export function SearchBar({onSearchSubmit}) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSubmit(e){
    e.preventDefault()

    if (searchQuery === "") return
    onSearchSubmit(searchQuery)

    setSearchQuery("")
  }

  return (
      <form className="search-bar-container" onSubmit={handleSubmit}>
        <TextField
          id="searchBar"
          value={searchQuery}
          onInput={(e) => {setSearchQuery(e.target.value);}}
          variant="outlined"
          label="Search..."
          size="small"
          fullWidth
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon fontSize="large"/>
        </IconButton>
      </form>
  );
}
