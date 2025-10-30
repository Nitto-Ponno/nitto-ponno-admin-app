'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';

type CustomProps = {
  classNameForChildren?: string;
};
function Separator({
  className,
  classNameForChildren,
  orientation = 'horizontal',
  decorative = true,
  children,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & CustomProps) {
  if (!children) {
    // default separator (no text)
    return (
      <SeparatorPrimitive.Root
        data-slot="separator"
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
          className,
        )}
        {...props}
      />
    );
  }

  // separator with centered children
  return (
    <div
      className={cn(
        'flex w-full items-center gap-2',
        orientation === 'vertical' && 'h-full flex-col',
      )}
    >
      <SeparatorPrimitive.Root
        decorative={decorative}
        data-slot="separator"
        orientation={orientation}
        className={cn(
          'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:flex-1 data-[orientation=vertical]:w-px data-[orientation=vertical]:flex-1',
        )}
        {...props}
      />
      <span
        className={cn('text-muted-foreground text-sm', classNameForChildren)}
      >
        {children}
      </span>
      <SeparatorPrimitive.Root
        decorative={decorative}
        data-slot="separator"
        orientation={orientation}
        className={cn(
          'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:flex-1 data-[orientation=vertical]:w-px data-[orientation=vertical]:flex-1',
        )}
        {...props}
      />
    </div>
  );
}

export { Separator };
