import React from "react";
import { UniformText, UniformSlot, registerUniformComponent } from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

export interface ContactSectionProps {
  component?: any;
  heading?: string;
  description?: string;
  className?: string;
}

/**
 * ContactSection - Contact Form & Team Member Section
 * 
 * A section component with a two-column layout featuring editable slots for
 * contact form and team member card components.
 * 
 * Features:
 * - Two-column responsive layout
 * - Slots for ContactForm and ContactCard components
 * - Section heading and description
 * - Uniform text editing for header content
 * 
 * Slots:
 * - leftColumn: Contact form component (max 1)
 * - rightColumn: Contact card component (max 1)
 * 
 * Use Cases:
 * - Contact pages
 * - Inquiry forms
 * - Team contact sections
 * - Support sections
 * 
 * Responsive Behavior:
 * - Mobile: Stacked single column
 * - Desktop (lg): Two columns side-by-side
 */
export const ContactSection: React.FC<ContactSectionProps> = ({
  component,
  heading,
  description,
  className = "",
}) => {
  return (
    <section className={cn("relative z-10 py-12 px-6 bg-muted/20", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-card ring-1 ring-border/50 shadow-xl p-6 md:p-10">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-balance">
              {component ? (
                <UniformText parameterId="heading" placeholder="Contact heading" as="span" />
              ) : (
                heading || "Contact Us"
              )}
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              {component ? (
                <UniformText parameterId="description" placeholder="Contact description" as="span" />
              ) : (
                description || "Get in touch with our team"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start max-w-5xl mx-auto">
            {/* Left Column - Contact Form Slot */}
            <UniformSlot name="leftColumn" />

            {/* Right Column - Contact Card Slot */}
            <UniformSlot name="rightColumn" />
          </div>
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "contactSection",
  component: ContactSection,
});

export default ContactSection;

