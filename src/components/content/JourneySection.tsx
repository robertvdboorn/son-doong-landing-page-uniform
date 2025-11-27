import React from "react";
import { UniformText, UniformSlot, registerUniformComponent } from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

export interface JourneySectionProps {
  component?: any;
  heading?: string;
  subheading?: string;
  className?: string;
}

/**
 * JourneySection - Journey/Process Timeline Section
 * 
 * A section component for displaying a journey, process, or timeline with
 * numbered phases. Features a card container, centered heading, phase grid,
 * and CTA button.
 * 
 * Features:
 * - Card-style container with rounded corners
 * - Centered section header
 * - Uniform text editing for heading and subheading
 * - Responsive grid layout for journey phases
 * - Optional CTA slot for call-to-action buttons
 * 
 * Slots:
 * - phases: JourneyPhaseCard components
 * - cta: Optional CTA button (CTAButton component)
 * 
 * Use Cases:
 * - Expedition journeys
 * - Process timelines
 * - Step-by-step guides
 * - Sequential information
 * 
 * Responsive Behavior:
 * - Mobile: Single column
 * - Tablet (md): 2 columns
 * - Desktop (lg): 4 columns
 */
export const JourneySection: React.FC<JourneySectionProps> = ({
  component,
  heading,
  subheading,
  className = "",
}) => {
  return (
    <section className={cn("relative z-10 py-12 px-6 bg-muted/20", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-card border border-border p-6 md:p-10">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-balance">
              {component ? (
                <UniformText parameterId="heading" placeholder="Journey heading" as="span" />
              ) : (
                heading || "Your Journey"
              )}
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              {component ? (
                <UniformText parameterId="subheading" placeholder="Journey subheading" as="span" />
              ) : (
                subheading || "Follow the steps of your adventure"
              )}
            </p>
          </div>

          {/* Journey Phase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <UniformSlot name="phases" />
          </div>

          {/* Optional CTA Button */}
          <div className="text-center">
            <UniformSlot name="cta" />
          </div>
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "journeySection",
  component: JourneySection,
});

export default JourneySection;

