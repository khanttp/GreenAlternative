import { useState } from "react";
import FilterPanel from "./FilterPanel";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import "../assets/styles/FilterPanel.css";

export default function FilterPanelContainer({ onFilter }) {
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const toggleFilterPanel = () => {
    setShowFilterPanel((prev) => !prev);
  };

  return (
    <div className="filter-panel-container">
      <IconButton
        onClick={toggleFilterPanel}
        aria-label="filter"
        className="icon-button"
      >
        <FilterListIcon fontSize="large" />
      </IconButton>
      {showFilterPanel && (
        <FilterPanel onFilter={onFilter} />
      )}
    </div>
  );


}
