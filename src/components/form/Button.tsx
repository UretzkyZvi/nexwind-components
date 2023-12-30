import React from "react";

const variants = {
  primary:
    "rounded bg-primary px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  secondary:
    "rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
  primaryDark:
    "rounded bg-primary/80 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/80",
  secondaryDark:
    "rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-white/20",
  soft: "rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary shadow-sm hover:bg-primary/20",
  leadingIcon:
    "inline-flex items-center gap-x-1.5 rounded-md bg-primary px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  trailingIcon:
    "inline-flex items-center gap-x-1.5 rounded-md bg-primary px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  roundedPrimary:
    "rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  secondaryRounded:
    "rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
  circle:
    "rounded-full bg-primary p-1 text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
};

const sizes = {
  xs: "px-2 py-1 text-xs active:px-1.5 active:py-0.5  ", // Extra Small
  sm: "px-2.5 py-1.5 text-sm active:px-2 active:py-1", // Small
  md: "px-3 py-2 text-base active:px-2.5 active:py-1.5", // Medium
  lg: "px-4 py-2.5 text-lg active:px-3.5 active:py-2", // Large
  xl: "px-5 py-3 text-xl active:px-4 active:py-2.5", // Extra Large
  "2xl": "px-6 py-3.5 text-2xl active:px-5 active:py-3", // 2X Large
  "3xl": "px-7 py-4 text-3xl active:px-6 active:py-3.5", // 3X Large
  "4xl": "px-8 py-4.5 text-4xl active:px-7 active:py-4", // 4X Large
};

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "sm",
  className = "",
  icon,
}) => {
  const baseStyle = "rounded shadow-sm focus-visible:outline ...";
  const variantStyle = variants[variant];
  const sizeStyle = sizes[size];

  return (
    <button
      type="button"
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}    `}
      onClick={onClick}
    >
      {icon} {children}
    </button>
  );
};

export default Button;
