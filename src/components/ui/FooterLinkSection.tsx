import React from "react";
import { UniformText, UniformSlot, registerUniformComponent } from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

export interface FooterLinkSectionProps {
  component?: any;
  title?: string;
  className?: string;
}

/**
 * FooterLinkSection - Footer Link Group
 * 
 * A section component for grouping footer links under a title.
 * Contains a slot for FooterLink components.
 * 
 * Features:
 * - Uppercase, tracked title styling
 * - Uniform text editing for title
 * - Slot for footer links
 * - Primary color title
 * 
 * Use Cases:
 * - Footer navigation groups
 * - Footer menu sections
 * - Categorized footer links
 */
export const FooterLinkSection: React.FC<FooterLinkSectionProps> = ({
  component,
  title,
  className = "",
}) => {
  return (
    <div className={cn("", className)}>
      <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary">
        {component ? (
          <UniformText parameterId="title" placeholder="SECTION TITLE" as="span" />
        ) : (
          title || "SECTION"
        )}
      </h3>
      <ul className="space-y-2">
        <UniformSlot name="links" />
      </ul>
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "footerLinkSection",
  component: FooterLinkSection,
});

export default FooterLinkSection;

