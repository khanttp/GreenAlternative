import { useState } from "react";
import "../assets/styles/FilterPanel.css";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function FilterPanel({ onFilter }) {
  const [sortOrder, setSortOrder] = useState("");

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleApplyFilters = () => {
    onFilter({ sortOrder });
  };

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3>Sort by Price</h3>
        <Select
          value={sortOrder}
          onChange={handleSortOrderChange}
          displayEmpty
          style={{ width: "100%" }}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="lowToHigh">Low to High</MenuItem>
          <MenuItem value="highToLow">High to Low</MenuItem>
        </Select>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleApplyFilters}
        style={{ marginTop: "10px" }}
      >
        Apply Filters
      </Button>
    </div>
  );
}
