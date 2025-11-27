import React from "react";
import { registerUniformComponent } from "@uniformdev/canvas-react";
import type { AssetParamValue } from "@uniformdev/assets";
import { getTransformedImageUrl } from "@/utilities/imageTransform";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

export interface LogoItemProps {
  className?: string;
  logo?: AssetParamValue;
  logoWidth?: number;
  logoHeight?: number;
  companyName?: string;
}

/**
 * Logo Item Component
 * 
 * A single logo item for use in logo marquees or logo grids.
 * Optimized for displaying company logos with proper sizing and accessibility.
 * 
 * Features:
 * - Asset support for logo images
 * - Customizable width and height
 * - Proper alt text from company name
 * - Optimized for logo marquees
 * 
 * Use Cases:
 * - Logo marquees
 * - Partner/client logo grids
 * - "As featured in" sections
 * - Trust indicators
 */
export const LogoItem: React.FC<LogoItemProps> = ({
  className = "",
  logo,
  logoWidth = 140,
  logoHeight = 60,
  companyName = "Company",
}) => {
  // Process logo asset
  const logoAssets = logo ?? [];
  const [logoAsset] = logoAssets;
  const logoUrl = getTransformedImageUrl(logoAsset, {
    width: logoWidth * 2, // 2x for retina
    height: logoHeight * 2,
    fit: "contain",
    quality: 90,
  });
  const logoAlt = logoAsset?.fields?.description?.value || 
                 logoAsset?.fields?.title?.value || 
                 `${companyName} logo`;

  if (!logoUrl) {
    return (
      <div 
        className={cn("logo-item flex items-center justify-center bg-gray-100", className)}
        style={{ width: logoWidth, height: logoHeight }}
      >
        <span className="text-gray-400 text-xs">Logo</span>
      </div>
    );
  }

  return (
    <div className={cn("logo-item", className)} style={{ width: logoWidth }}>
      <NextImage
        src={logoUrl}
        alt={logoAlt}
        width={logoWidth}
        height={logoHeight}
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

registerUniformComponent({
  type: "logoItem",
  component: LogoItem,
});

export default LogoItem;


