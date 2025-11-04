import React, { ReactNode } from 'react';

type TProps = {
  title: string;
  subtitle?: string;
  buttons?: ReactNode;
};

const PageHeader = ({ title, subtitle, buttons }: TProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 pb-4">
      <div>
        <h4 className="text-2xl font-semibold">{title}</h4>
        <p className="text-foreground text-gray text-sm">{subtitle}</p>
      </div>
      <div className="flex gap-2">{buttons}</div>
    </div>
  );
};

export default PageHeader;
