import React from "react";
import { UniformText, UniformSlot, registerUniformComponent } from "@uniformdev/canvas-react";
import type { AssetParamValue } from "@uniformdev/assets";
import { getTransformedImageUrl } from "@/utilities/imageTransform";
import { HeroBadge } from "@/components/ui/HeroBadge";
import { Leaf, Shield, Star, Heart, Award, CheckCircle, Sparkles, Zap, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// Icon mapping helper
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

export type IconName = keyof typeof iconMap;

export interface HeroProps {
  component?: any;
  backgroundImage?: AssetParamValue;
  badgeText?: string;
  badgeIcon?: IconName;
  showBadge?: boolean;
  title?: string;
  description?: string;
  footerNote?: string;
  footerNoteIcon?: IconName;
  showFooterNote?: boolean;
  className?: string;
}

/**
 * Hero - Full-screen Hero Section Component
 * 
 * A dramatic full-screen hero section with background image, gradient overlay,
 * and centered content. Perfect for creating stunning first impressions.
 * 
 * Features:
 * - Full viewport height background image with focal point support
 * - Gradient overlay for text readability
 * - Optional badge with glass morphism styling
 * - Large, impactful headline (text-6xl to text-8xl)
 * - Descriptive subheading
 * - CTA button slots for primary and secondary actions
 * - Optional footer note at bottom center
 * 
 * Slots:
 * - primaryCta: Main call-to-action button
 * - secondaryCta: Secondary action button
 * 
 * Use Cases:
 * - Homepage hero section
 * - Landing page headers
 * - Campaign landing pages
 * - Product showcase pages
 * 
 * Responsive Behavior:
 * - Mobile: Smaller headline (text-6xl), single column buttons
 * - Desktop: Larger headline (text-8xl), horizontal button layout
 */
export const Hero: React.FC<HeroProps> = ({
  component,
  backgroundImage,
  badgeText,
  badgeIcon = "Leaf",
  showBadge = false,
  title,
  description,
  footerNote,
  footerNoteIcon = "Shield",
  showFooterNote = false,
  className = "",
}) => {
  // Extract background image from asset parameter
  const imageAssets = backgroundImage ?? [];
  const [firstAsset] = imageAssets;
  
  // Get focal point from asset
  const focalPoint = firstAsset?.fields?.focalPoint?.value;
  
  // Transform image with focal point
  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 1920,
    height: 1080,
    fit: "cover",
    focal: focalPoint || "center",
    quality: 90,
  });

  // Calculate background position from focal point
  const backgroundPosition = focalPoint
    ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
    : 'center';

  return (
    <div className={cn("relative min-h-screen", className)}>
      {/* Background Image with Overlay */}
      {imageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: `url('${imageUrl}')`,
            backgroundPosition,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/10 to-primary/20">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Optional Badge */}
        {showBadge && (
          <div className="mb-6">
            {component ? (
              <HeroBadge component={component} iconName={badgeIcon} showIcon={true} />
            ) : (
              <HeroBadge text={badgeText} variant="glass" iconName={badgeIcon} showIcon={true} />
            )}
          </div>
        )}

        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-balance text-white drop-shadow-2xl">
          {component ? (
            <UniformText parameterId="title" placeholder="Hero headline" as="span" />
          ) : (
            title || "Your Amazing Headline"
          )}
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl font-normal text-white max-w-2xl mb-10 leading-relaxed drop-shadow-lg">
          {component ? (
            <UniformText parameterId="description" placeholder="Hero description" as="span" />
          ) : (
            description || "A compelling description that captures attention"
          )}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <UniformSlot name="primaryCta" />
          <UniformSlot name="secondaryCta" />
        </div>

        {/* Footer Note */}
        {showFooterNote && (footerNote || component) && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            {(() => {
              const FooterIcon = iconMap[footerNoteIcon] || Shield;
              return <FooterIcon className="w-4 h-4 text-white" />;
            })()}
            <span className="text-sm font-medium text-white">
              {component ? (
                <UniformText parameterId="footerNote" placeholder="Footer note" as="span" />
              ) : (
                footerNote
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "hero",
  component: Hero,
});

export default Hero;

