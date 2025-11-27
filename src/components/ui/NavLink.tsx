import React from "react";
import { UniformText, registerUniformComponent } from "@uniformdev/canvas-react";
import { LinkParamValue } from "@uniformdev/canvas";
import { cn } from "@/lib/utils";

export interface NavLinkProps {
  component?: any;
  text?: string;
  link?: LinkParamValue;
  variant?: "glass" | "solid";
  className?: string;
}

/**
 * NavLink - Navigation Link Component
 * 
 * A styled navigation link component with two visual variants:
 * - glass: Semi-transparent with backdrop blur (default)
 * - solid: Solid background with primary color
 * 
 * Features:
 * - Uniform text editing support
 * - Link parameter binding
 * - Responsive styling with rounded full buttons
 * - Smooth hover transitions
 * - Mobile-first: Full width on mobile, auto on desktop
 * - Context-aware: Adapts styling in mobile navigation drawer
 * 
 * Use Cases:
 * - Navigation menu items
 * - CTA buttons in navigation
 * - Action links throughout the site
 * 
 * Responsive Behavior:
 * - Mobile (in drawer): Full width, centered text
 * - Desktop: Inline, auto width
 */
export const NavLink: React.FC<NavLinkProps> = ({
  component,
  text,
  link,
  variant = "glass",
  className = "",
}) => {
  // Extract href from link parameter
  const href = link?.path || "#";
  
  // Base styles with mobile-first responsive classes
  const baseStyles = "px-5 py-2.5 rounded-full transition-colors font-medium text-center lg:inline-block";
  
  // Variant styles
  const variantStyles = {
    glass: "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white",
    solid: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl",
  };
  
  // Mobile navigation context - full width in mobile drawer
  const mobileStyles = "w-full lg:w-auto block";

  return (
    <a href={href} className={cn(baseStyles, variantStyles[variant], mobileStyles, className)}>
      {component ? (
        <UniformText parameterId="text" placeholder="Link text" as="span" />
      ) : (
        text || "Link"
      )}
    </a>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "navLink",
  component: NavLink,
});

export default NavLink;

