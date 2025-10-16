import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80 shadow-[0_0_15px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_25px_hsl(var(--primary)/0.8)] transition-all duration-300",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary bg-background hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_0_15px_hsl(var(--secondary)/0.5)] hover:shadow-[0_0_25px_hsl(var(--secondary)/0.8)] transition-all duration-300",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "relative overflow-hidden bg-gradient-to-r from-[hsl(180,100%,50%)] via-[hsl(280,100%,60%)] to-[hsl(320,100%,60%)] text-[hsl(220,30%,6%)] font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_hsl(180,100%,50%,0.5),0_0_40px_hsl(320,100%,60%,0.3)] hover:shadow-[0_0_30px_hsl(180,100%,50%,0.8),0_0_60px_hsl(320,100%,60%,0.5)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        glass: "backdrop-blur-xl bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/50 text-foreground hover:border-primary hover:bg-primary/30 transition-all duration-300 shadow-[0_0_15px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_25px_hsl(var(--primary)/0.6)]",
        neon: "bg-background border-2 border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 shadow-[0_0_10px_hsl(var(--primary)/0.5),inset_0_0_10px_hsl(var(--primary)/0.1)] hover:shadow-[0_0_20px_hsl(var(--primary)/0.8),inset_0_0_20px_hsl(var(--primary)/0.2)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
