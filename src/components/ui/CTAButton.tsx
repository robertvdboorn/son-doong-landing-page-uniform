import React from "react";
import { UniformText, registerUniformComponent } from "@uniformdev/canvas-react";
import { LinkParamValue } from "@uniformdev/canvas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CTAButtonProps {
  component?: any;
  text?: string;
  link?: LinkParamValue;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "default" | "lg";
  className?: string;
}

/**
 * CTAButton - Call-to-Action Button Component
 * 
 * A styled button component with multiple visual variants, perfect for
 * hero sections and CTA placements throughout the site.
 * 
 * Features:
 * - Three visual variants: primary (solid), secondary (glass), outline
 * - Multiple sizes: sm, default, lg
 * - Uniform text editing support
 * - Link parameter binding
 * - Rounded full button shape
 * 
 * Use Cases:
 * - Primary CTAs in hero sections
 * - Secondary actions
 * - Call-to-action buttons throughout the site
 */
export const CTAButton: React.FC<CTAButtonProps> = ({
  component,
  text,
  link,
  variant = "primary",
  size = "lg",
  className = "",
}) => {
  // Extract href from link parameter
  const href = link?.path || "#";
  
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-2xl font-medium",
    secondary: "bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 rounded-full shadow-xl font-medium",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full font-medium",
  };

  return (
    <a href={href} className="inline-block">
      <Button size={size} className={cn(variantStyles[variant], className)}>
        {component ? (
          <UniformText parameterId="text" placeholder="Button text" as="span" />
        ) : (
          text || "Click here"
        )}
      </Button>
    </a>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "ctaButton",
  component: CTAButton,
});

export default CTAButton;

