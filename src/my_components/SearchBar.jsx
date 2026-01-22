import React from "react";
import { Input } from "@/components/ui/input";

function SearchBar({ value, onChange }) {
  return (
    <Input
      placeholder="Search by name or ingredient"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
