import React from "react";

interface FilterCheckboxProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ label, value, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <input type="checkbox" id={value} checked={checked} onChange={() => onChange(value)} />
      <label htmlFor={value}>{label}</label>
    </div>
  );
};

export default FilterCheckbox;
