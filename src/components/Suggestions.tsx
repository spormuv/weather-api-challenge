/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { OptionType } from '../types';

type SuggestionsProps = {
  options: OptionType[];
  onSelect: (option: OptionType) => void;
};

const Suggestions = ({ options, onSelect }: SuggestionsProps) => (
  <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
    {options.map((option: OptionType, index: number) => (
      <li key={option.name + '-' + index}>
        <button
          className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
          onClick={() => onSelect(option)}
        >
          {option.name}, {option.country}
        </button>
      </li>
    ))}
  </ul>
);

export default Suggestions;
