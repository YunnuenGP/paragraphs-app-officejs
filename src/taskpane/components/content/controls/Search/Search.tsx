import * as React from "react";
import { SearchBox } from "@fluentui/react";

interface SearchProps {
  handleSearch: (value: string) => void;
}

export const Search = ({ handleSearch }: SearchProps) => {
  return (
    <SearchBox
      maxLength={50}
      placeholder="Search"
      onSearch={(newValue) => handleSearch(newValue)}
      // TODO: Find a solution for searchbox ignoring "escape" and "close" on "onChange" event.
      onChange={(event, newValue) => {
        console.log(event);
        handleSearch(newValue);
      }}
      onClear={() => {
        handleSearch("");
      }}
      tabIndex={0}
      showIcon
      underlined
      autoFocus
    />
  );
};
