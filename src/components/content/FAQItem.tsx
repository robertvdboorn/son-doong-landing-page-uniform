import React from "react";
import { UniformText, registerUniformComponent } from "@uniformdev/canvas-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItemProps {
  component?: any;
  question?: string;
  answer?: string;
  className?: string;
}

/**
 * FAQItem - Individual FAQ Accordion Item
 * 
 * A single FAQ question and answer that works within an accordion.
 * Designed to be used inside FAQSection component's items slot.
 * 
 * Features:
 * - Expandable/collapsible accordion item
 * - Plus/minus icon toggle
 * - Smooth animations
 * - Uniform text editing for question and answer
 * - Accessible keyboard navigation (via Radix UI)
 * 
 * Use Cases:
 * - FAQ sections
 * - Help documentation
 * - Product information Q&A
 * 
 * Important:
 * - Must be placed inside FAQSection component
 * - Parent component manages accordion state
 * - Auto-expands when selected in Canvas editor
 */
export const FAQItem: React.FC<FAQItemProps> = ({
  component,
  question,
  answer,
  className = "",
}) => {
  // Use component ID as accordion value for state management
  const componentId = component?._id || `item-${Math.random()}`;

  return (
    <AccordionPrimitive.Item
      value={componentId}
      className={cn("rounded-2xl bg-accent/30 ring-1 ring-border overflow-hidden shadow-sm mb-4 last:mb-0", className)}
    >
      {/* Question Header - Clickable trigger */}
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger className="w-full p-6 text-left flex items-center justify-between hover:bg-accent/50 transition-colors group">
          <h3 className="text-lg font-semibold pr-4 text-foreground">
            {component ? (
              <UniformText parameterId="question" placeholder="FAQ question" as="span" />
            ) : (
              question || "Your question here?"
            )}
          </h3>
          
          {/* Toggle Icons */}
          <span className="flex-shrink-0 text-primary">
            <Plus className="w-5 h-5 group-data-[state=open]:hidden" />
            <Minus className="w-5 h-5 group-data-[state=closed]:hidden" />
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      {/* Answer Content - Expandable */}
      <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="px-6 pb-6">
          <p className="text-muted-foreground leading-relaxed">
            {component ? (
              <UniformText parameterId="answer" placeholder="FAQ answer" as="span" />
            ) : (
              answer || "The answer to your question will appear here."
            )}
          </p>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "faqItem",
  component: FAQItem,
});

export default FAQItem;

