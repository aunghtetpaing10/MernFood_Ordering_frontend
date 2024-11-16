import { useSearchRestaurant } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  useEffect(() => {
    if (city) {
      setSearchState({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch",
      });
    }
  }, [city]);

  const { results, isLoading } = useSearchRestaurant(searchState, city);

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState({
      ...searchState,
      selectedCuisines,
      page: 1,
    });
  };

  const setSortOption = (sortOption: string) => {
    setSearchState({
      ...searchState,
      sortOption,
      page: 1,
    });
  };

  const setPage = (page: number) => {
    setSearchState({
      ...searchState,
      page,
    });
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState({
      ...searchState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    });
  };

  const resetSearch = () => {
    setSearchState({
      ...searchState,
      searchQuery: "",
      page: 1,
    });
  };

  if (!city) {
    return <span>No city found</span>;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!results?.data) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpendedClick={() => setIsExpanded(!isExpanded)}
        />
      </div>

      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeholder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />

        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}

        <PaginationSelector 
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
