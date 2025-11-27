import React from "react";
import { UniformText } from "@uniformdev/canvas-react";
import { Leaf, Shield, Star, Heart, Award, CheckCircle, Sparkles, Zap, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// Icon mapping
const iconMap = {
  Leaf,
  Shield,
  Star,
  Heart,
  Award,
  CheckCircle,
  Sparkles,
  Zap,
  Info,
};

export type BadgeIconName = keyof typeof iconMap;

export interface HeroBadgeProps {
  component?: any;
  text?: string;
  variant?: "glass" | "solid";
  iconName?: BadgeIconName;
  showIcon?: boolean;
  className?: string;
}

/**
 * HeroBadge - Badge component for hero sections
 * 
 * A decorative badge component with glass morphism or solid styling,
 * perfect for highlighting key information in hero sections.
 * 
 * Features:
 * - Two visual variants: glass (semi-transparent) and solid
 * - Optional icon (defaults to Leaf icon)
 * - Uniform text editing support
 * - Rounded pill shape
 * 
 * Use Cases:
 * - Hero section badges
 * - Featured content indicators
 * - Category or tag display
 */
export const HeroBadge: React.FC<HeroBadgeProps> = ({
  component,
  text,
  variant = "glass",
  iconName = "Leaf",
  showIcon = false,
  className = "",
}) => {
  const variantStyles = {
    glass: "bg-white/10 backdrop-blur-md border border-white/20",
    solid: "bg-primary/20 border border-primary/30",
  };

  const Icon = iconMap[iconName] || Leaf;

  return (
    <div className={cn("px-4 py-2 rounded-full", variantStyles[variant], className)}>
      <span className="text-sm font-medium text-white flex items-center gap-2">
        {showIcon && <Icon className="w-4 h-4" />}
        {component ? (
          <UniformText parameterId="badgeText" placeholder="Badge text" as="span" />
        ) : (
          text || "Badge"
        )}
      </span>
    </div>
  );
};

export default HeroBadge;

