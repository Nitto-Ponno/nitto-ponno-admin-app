import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type AlignType = 'start' | 'center' | 'end';

interface GlobalDropDownProps {
  dropdownMenuTrigger: React.ReactNode;
  dropdownMenuLabel?: string;
  dropdownMenuItems: React.ReactNode[];
  align?: AlignType;
}

const GlobalDropDown: React.FC<GlobalDropDownProps> = ({
  dropdownMenuTrigger,
  dropdownMenuLabel,
  dropdownMenuItems,
  align = 'end',
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{dropdownMenuTrigger}</DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {dropdownMenuLabel && (
          <DropdownMenuLabel>{dropdownMenuLabel}</DropdownMenuLabel>
        )}
        {dropdownMenuItems.map((item, i) => (
          <DropdownMenuItem key={i} asChild>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GlobalDropDown;
