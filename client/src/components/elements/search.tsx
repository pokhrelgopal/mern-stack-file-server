import React from "react";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";
import { Search } from "lucide-react";

type Props = {
  initialQuery?: string;
  placeholder?: string;
  delay?: number;
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<Props> = ({
  initialQuery = "",
  delay = 300,
  onSearch,
  placeholder = "Type to Search ...",
}) => {
  const { query, setQuery } = useSearch(onSearch, initialQuery, delay);

  return (
    <div className="relative w-full">
      <Input
        type="text"
        id="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 focus:border-gray-200 rounded-lg"
      />
      <Search className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar;
