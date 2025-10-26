import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'prefix' | 'suffix'
  > {
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, suffix, prefix, type, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        {prefix && (
          <span className="sidebar-foreground pointer-events-none absolute left-3 flex items-center">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(
            'file:text-foreground placeholder:sidebar-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-primary/30 h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[.5px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            prefix && 'pl-10',
            suffix && 'pr-10',
            className,
          )}
          {...props}
        />
        {suffix && (
          <span className="sidebar-foreground absolute right-3 flex items-center">
            {suffix}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
