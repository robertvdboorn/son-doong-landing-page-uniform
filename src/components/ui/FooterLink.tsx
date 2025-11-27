import React from "react";
import { UniformText, registerUniformComponent } from "@uniformdev/canvas-react";
import { LinkParamValue } from "@uniformdev/canvas";
import { cn } from "@/lib/utils";

export interface FooterLinkProps {
  component?: any;
  text?: string;
  link?: LinkParamValue;
  className?: string;
}

/**
 * FooterLink - Footer Navigation Link
 * 
 * A simple link component designed for footer navigation menus.
 * Features muted colors with hover transitions.
 * 
 * Features:
 * - Uniform text and link editing
 * - Hover color transition
 * - Muted styling for footer aesthetics
 * 
 * Use Cases:
 * - Footer navigation
 * - Footer menu items
 * - Link lists in footers
 */
export const FooterLink: React.FC<FooterLinkProps> = ({
  component,
  text,
  link,
  className = "",
}) => {
  const href = link?.path || "#";

  return (
    <li>
      <a href={href} className={cn("text-muted-foreground hover:text-foreground transition-colors text-sm leading-relaxed", className)}>
        {component ? (
          <UniformText parameterId="text" placeholder="Link text" as="span" />
        ) : (
          text || "Link"
        )}
      </a>
    </li>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "footerLink",
  component: FooterLink,
});

export default FooterLink;

