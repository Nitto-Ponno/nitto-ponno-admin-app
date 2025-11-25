import { ReactNode } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '../ui/drawer';
import { X } from 'lucide-react';

export const GlobalDrawer = ({
  drawerTrigger,
  isOpen,
  setIsOpen,
  children,
}: {
  drawerTrigger: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
}) => {
  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      {drawerTrigger && <DrawerTrigger asChild>{drawerTrigger}</DrawerTrigger>}

      <DrawerContent className="!w-full !max-w-none overflow-x-hidden overflow-y-auto p-6 pt-1">
        <DrawerClose className="-top-5 mb-2 w-fit rounded-full bg-red-400 p-1 text-white">
          <X />
        </DrawerClose>
        {children}
      </DrawerContent>
    </Drawer>
  );
};
