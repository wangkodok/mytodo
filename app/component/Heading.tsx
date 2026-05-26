import React, { ElementType, HTMLAttributes } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({ level, children, className = '', ...props }: HeadingProps) => {
  const Tag = `h${level}` as ElementType;

  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
};