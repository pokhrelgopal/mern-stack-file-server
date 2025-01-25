import SearchBar from "@/components/elements/search";
import { Stack } from "@/components/ui/stack";
import React from "react";

const FileTableSearch = () => {
  const handleSearch = (value: string) => {};
  return (
    <Stack justify={"start"} className="mt-4">
      <div className="w-96">
        <SearchBar onSearch={handleSearch} />
      </div>
    </Stack>
  );
};

export default FileTableSearch;
