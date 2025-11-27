import React from "react";
import { UniformText, UniformSlot, registerUniformComponent } from "@uniformdev/canvas-react";
import { Compass } from "lucide-react";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { cn } from "@/lib/utils";

export interface FooterSectionProps {
  component?: any;
  brandName?: string;
  brandDescription?: string;
  showNewsletter?: boolean;
  newsletterTitle?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  copyright?: string;
  className?: string;
}

/**
 * FooterSection - Site Footer Component
 * 
 * A comprehensive footer section with brand information, link sections,
 * newsletter signup, and copyright information.
 * 
 * Features:
 * - Brand section with logo and description
 * - Multiple link section slots for organized navigation
 * - Optional newsletter signup form
 * - Copyright footer
 * - Responsive grid layout
 * - Card-style container
 * 
 * Slots:
 * - linkSections: FooterLinkSection components for navigation groups
 * 
 * Use Cases:
 * - Site footer
 * - Page footer with navigation
 * - Newsletter signup area
 * 
 * Responsive Behavior:
 * - Mobile: Single column stacked layout
 * - Tablet (md): 2 columns
 * - Desktop (lg): 5 columns (brand spans 2)
 */
export const FooterSection: React.FC<FooterSectionProps> = ({
  component,
  brandName,
  brandDescription,
  showNewsletter = false,
  newsletterTitle,
  newsletterPlaceholder,
  newsletterButtonText,
  copyright,
  className = "",
}) => {
  return (
    <footer className={cn("relative z-10 py-12 px-6 bg-muted/20", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-card ring-1 ring-border p-8 shadow-sm">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Compass className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold text-foreground">
                  {component ? (
                    <UniformText parameterId="brandName" placeholder="Brand name" as="span" />
                  ) : (
                    brandName || "Brand Name"
                  )}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {component ? (
                  <UniformText parameterId="brandDescription" placeholder="Brand description" as="span" />
                ) : (
                  brandDescription || "Your brand description goes here"
                )}
              </p>
            </div>

            {/* Footer Link Sections */}
            <UniformSlot name="linkSections" />
          </div>

          {/* Newsletter Section */}
          {showNewsletter && (
            <NewsletterForm
              title={newsletterTitle}
              placeholder={newsletterPlaceholder}
              buttonText={newsletterButtonText}
            />
          )}

          {/* Sub-footer */}
          <div className="border-t border-primary/10 pt-8">
            <p className="text-muted-foreground text-sm text-center">
              {component ? (
                <UniformText parameterId="copyright" placeholder="© 2025 Company Name" as="span" />
              ) : (
                copyright || "© 2025 Company Name"
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "footerSection",
  component: FooterSection,
});

export default FooterSection;

