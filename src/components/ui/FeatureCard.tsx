import React from "react";
import { UniformText, registerUniformComponent } from "@uniformdev/canvas-react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  component?: any;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * FeatureCard - Feature Highlight Card
 * 
 * A card component for displaying key features or benefits with an icon,
 * title, and description. Perfect for feature grids and highlights.
 * 
 * Features:
 * - Icon display with colored background
 * - Uniform text editing for title and description
 * - Hover border effect
 * - Centered text alignment
 * 
 * Use Cases:
 * - Feature sections
 * - Benefits showcases
 * - Service listings
 * - Key highlights
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({
  component,
  title,
  description,
  className = "",
}) => {
  return (
    <div className={cn("rounded-2xl bg-card border border-border p-5 text-center hover:border-primary/50 transition-all", className)}>
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/5 mb-3">
        <Sparkles className="w-5 h-5 text-primary" />
      </div>
      <h3 className="text-base font-semibold mb-2 text-foreground">
        {component ? (
          <UniformText parameterId="title" placeholder="Feature title" as="span" />
        ) : (
          title || "Feature Title"
        )}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {component ? (
          <UniformText parameterId="description" placeholder="Feature description" as="span" />
        ) : (
          description || "Feature description"
        )}
      </p>
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "featureCard",
  component: FeatureCard,
});

export default FeatureCard;

