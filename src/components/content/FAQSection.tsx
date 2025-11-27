import React, { useState, useEffect } from "react";
import { UniformText, UniformSlot, registerUniformComponent, useUniformContextualEditingState } from "@uniformdev/canvas-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

export interface FAQSectionProps {
  component?: any;
  heading?: string;
  description?: string;
  className?: string;
}

/**
 * FAQSection - Frequently Asked Questions Section
 * 
 * An accordion-style FAQ section with a two-column layout featuring a heading
 * and description on the left, and expandable FAQ items on the right.
 * 
 * Features:
 * - Parent-managed accordion state for Canvas editor integration
 * - Auto-expansion when FAQ items are selected in Canvas
 * - Two-column responsive layout (stacks on mobile)
 * - Card design with rounded corners and subtle shadows
 * - Smooth accordion animations
 * - Single FAQ open at a time
 * 
 * Slots:
 * - items: FAQ item components
 * 
 * Use Cases:
 * - FAQ pages
 * - Product information pages
 * - Support sections
 * - Landing pages with common questions
 * 
 * Responsive Behavior:
 * - Mobile: Single column, heading/description on top
 * - Desktop (lg+): Two columns side-by-side
 */
export const FAQSection: React.FC<FAQSectionProps> = ({
  component,
  heading,
  description,
  className = "",
}) => {
  const [expandedItem, setExpandedItem] = useState<string>("");
  const { selectedComponentReference } = useUniformContextualEditingState();
  
  // Auto-expand FAQ items when selected in Canvas editor
  useEffect(() => {
    const selectedId = selectedComponentReference?.id;
    
    if (selectedId && component?.slots?.items) {
      // Find if selected component is a child item
      const childItems = component.slots.items;
      const selectedChild = childItems.find((item: any) => {
        const itemId = item._id;
        // Handle both simple IDs and composite IDs (pattern|component)
        return itemId === selectedId || 
               itemId?.includes(selectedId) || 
               selectedId?.includes(itemId);
      });
      
      if (selectedChild) {
        setExpandedItem(selectedChild._id);
      }
    }
  }, [selectedComponentReference, component]);

  return (
    <section className={cn("relative z-10 py-24 px-6 bg-muted/20", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-card ring-1 ring-border p-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Title and Description */}
            <div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance text-foreground">
                {component ? (
                  <UniformText parameterId="heading" placeholder="FAQ section heading" as="span" />
                ) : (
                  heading || "Frequently Asked Questions"
                )}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                {component ? (
                  <UniformText parameterId="description" placeholder="Section description" as="span" />
                ) : (
                  description || "Find answers to common questions about our services"
                )}
              </p>
            </div>

            {/* Right Column - FAQ Accordion */}
            <div className="space-y-4">
              <AccordionPrimitive.Root
                type="single"
                collapsible
                value={expandedItem}
                onValueChange={setExpandedItem}
              >
                <UniformSlot name="items" />
              </AccordionPrimitive.Root>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "faqSection",
  component: FAQSection,
});

export default FAQSection;

