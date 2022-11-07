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
      onChange={(event, newValue) => {
        event?.stopPropagation();
        handleSearch(newValue);
      }}
      tabIndex={0}
      showIcon
      underlined
      autoFocus
    />
  );
};
