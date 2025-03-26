import React from 'react';
import { cn } from "@/lib/utils";

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'login' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

const PixelButton = ({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: PixelButtonProps) => {
  const baseStyles = "relative transition-all duration-150 bg-[#FF66B3] border-2 border-[#A3F0E0] text-white active:translate-y-1 active:shadow-none";

  const variantStyles = {
    primary: "hover:bg-[#FF66B3]/80",
    secondary: "bg-[#2A1A3E] hover:bg-[#2A1A3E]/80",
    login: "bg-[#FF66B3] hover:bg-[#FF66B3]/80",
    destructive: "bg-[#FF66B3]/70 hover:bg-[#FF66B3]/50",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  
  // Shadow effect
  const shadowStyle = "shadow-[0_4px_0_rgba(163,240,224,0.3)]"; // #A3F0E0의 rgba 값

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        shadowStyle,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default PixelButton;