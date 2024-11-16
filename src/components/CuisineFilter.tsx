import { cuisineList } from "@/config/restaurant-options-config";
import { ChangeEvent } from "react";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  selectedCuisines: string[];
  onChange: (cuisines: string[]) => void;
  isExpanded: boolean;
  onExpendedClick: () => void;
};

const CuisineFilter = ({
  selectedCuisines,
  onChange,
  isExpanded,
  onExpendedClick,
}: Props) => {
  const handleCuisinesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = e.target.value;
    const isChecked = e.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisinesList);
  };

  const handleCuisinesReset = () => onChange([]);

  return (
    <>
      <div className="flex items-center justify-between px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex">
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold
                        ${
                          isSelected
                            ? "border border-green-600 text-green-600"
                            : "border border-slate-300"
                        }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
      </div>

      <Button
        onClick={onExpendedClick}
        variant={"link"}
        className="mt-4 flex-1"
      >
        {isExpanded ? (
          <span className="flex items-center">
            View Less <ChevronUp className="ml-1" />
          </span>
        ) : (
          <span className="flex items-center">
            View More <ChevronDown className="ml-1" />
          </span>
        )}
      </Button>
    </>
  );
};

export default CuisineFilter;
