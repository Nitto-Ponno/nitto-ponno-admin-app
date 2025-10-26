import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '../ui/separator';

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
          <DropdownMenuLabel className="text-center">
            {dropdownMenuLabel}
          </DropdownMenuLabel>
        )}
        <Separator />
        <div className="mt-1 space-y-2">
          {dropdownMenuItems.map((item, i) => (
            <DropdownMenuItem key={i} asChild>
              {item}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GlobalDropDown;
