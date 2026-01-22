import React from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * SearchBar Component - Search input with icon and clear functionality
 * @param {string} value - Current search query
 * @param {Function} onChange - Callback to update search query
 */
function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      {/* Search Icon */}
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

      {/* Search Input */}
      <Input
        placeholder="Search by recipe name or ingredient..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10 h-12 text-base"
      />

      {/* Clear Button */}
      {value && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          onClick={() => onChange("")}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

export default SearchBar;
