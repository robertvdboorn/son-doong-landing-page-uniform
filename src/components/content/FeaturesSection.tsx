import React from "react";
import { UniformText, UniformSlot, registerUniformComponent } from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

export interface FeaturesSectionProps {
  component?: any;
  heading?: string;
  subheading?: string;
  className?: string;
}

/**
 * FeaturesSection - Feature Highlights Section
 * 
 * A section component for showcasing key features or benefits in a grid layout.
 * Features centered heading, subheading, and a responsive grid of feature cards.
 * 
 * Features:
 * - Centered section header
 * - Uniform text editing for heading and subheading
 * - Responsive grid layout (1 col mobile → 2 col tablet → 4 col desktop)
 * - Slot for FeatureCard components
 * 
 * Slots:
 * - features: FeatureCard components
 * 
 * Use Cases:
 * - Product features
 * - Service highlights
 * - Benefits sections
 * - Key offerings
 * 
 * Responsive Behavior:
 * - Mobile: Single column
 * - Tablet (md): 2 columns
 * - Desktop (xl): 4 columns
 */
export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  component,
  heading,
  subheading,
  className = "",
}) => {
  return (
    <section className={cn("relative z-10 py-12 px-6 bg-muted/20", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-balance">
            {component ? (
              <UniformText parameterId="heading" placeholder="Section heading" as="span" />
            ) : (
              heading || "Our Features"
            )}
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            {component ? (
              <UniformText parameterId="subheading" placeholder="Section subheading" as="span" />
            ) : (
              subheading || "Discover what makes us special"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <UniformSlot name="features" />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "featuresSection",
  component: FeaturesSection,
});

export default FeaturesSection;

