import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Grid, Select, Typography } from "@mui/material";

export default function CountrySelect() {
  const [selectedOptions, setSelectedOptions] = React.useState();

  const optionList = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "white", label: "White" },
  ];

  function handleSelect(data: any) {
    setSelectedOptions(data);
  }

  return (
    <Select
      placeholder="Select color"
      value={selectedOptions}
      onChange={handleSelect}
    />
  );
}
