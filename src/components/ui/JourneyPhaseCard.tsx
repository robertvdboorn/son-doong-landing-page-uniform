import React from "react";
import { UniformText, registerUniformComponent } from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

export interface JourneyPhaseCardProps {
  component?: any;
  number?: string;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * JourneyPhaseCard - Numbered Journey Phase Card
 * 
 * A card component for displaying journey phases or steps with a large
 * number, title, and description. Perfect for timeline or process displays.
 * 
 * Features:
 * - Large numbered display in nature green color
 * - Uniform text editing for number, title, and description
 * - Hover border effect
 * - Compact, informative layout
 * 
 * Use Cases:
 * - Journey or expedition phases
 * - Process steps
 * - Timeline displays
 * - Instructional sequences
 */
export const JourneyPhaseCard: React.FC<JourneyPhaseCardProps> = ({
  component,
  number,
  title,
  description,
  className = "",
}) => {
  return (
    <div className={cn("rounded-2xl bg-accent/30 border border-border p-5 hover:border-primary/50 transition-all", className)}>
      <div className="text-4xl font-bold text-primary mb-2">
        {component ? (
          <UniformText parameterId="number" placeholder="01" as="span" />
        ) : (
          number || "01"
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-foreground">
        {component ? (
          <UniformText parameterId="title" placeholder="Phase title" as="span" />
        ) : (
          title || "Phase Title"
        )}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {component ? (
          <UniformText parameterId="description" placeholder="Phase description" as="span" />
        ) : (
          description || "Phase description"
        )}
      </p>
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "journeyPhaseCard",
  component: JourneyPhaseCard,
});

export default JourneyPhaseCard;

