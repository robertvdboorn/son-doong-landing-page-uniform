import React from "react";
import { UniformText, registerUniformComponent } from "@uniformdev/canvas-react";
import type { AssetParamValue } from "@uniformdev/assets";
import { getTransformedImageUrl } from "@/utilities/imageTransform";
import { cn } from "@/lib/utils";

export interface ContactCardProps {
  component?: any;
  name?: string;
  role?: string;
  bio?: string;
  image?: AssetParamValue;
  className?: string;
}

/**
 * ContactCard - Team Member Contact Card Component
 * 
 * A card displaying team member information with photo, name, role, and bio.
 * Designed to be used within the Contact Section component.
 * 
 * Features:
 * - Circular profile photo with focal point support
 * - Name, role, and bio text fields
 * - Fallback initial display if no image
 * - Center-aligned layout
 * - Rounded modern styling
 * 
 * Use Cases:
 * - Team member showcase in contact sections
 * - Contact person display
 * - Support team profiles
 * - Customer success representatives
 */
export const ContactCard: React.FC<ContactCardProps> = ({
  component,
  name,
  role,
  bio,
  image,
  className = "",
}) => {
  // Extract contact image
  const imageAssets = image ?? [];
  const [firstAsset] = imageAssets;
  const focalPoint = firstAsset?.fields?.focalPoint?.value;
  
  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 200,
    height: 200,
    fit: "cover",
    focal: focalPoint || "center",
    quality: 85,
  });

  // Get alt text
  const imageAlt = firstAsset?.fields?.description?.value || 
                   firstAsset?.fields?.title?.value || 
                   name || 
                   'Contact person';

  return (
    <div className={cn("rounded-3xl border border-border bg-accent/30 p-6", className)}>
      <div className="flex flex-col items-center text-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/10 mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-primary/10 ring-4 ring-primary/10 mb-4 flex items-center justify-center">
            <span className="text-primary text-3xl font-bold">
              {name?.charAt(0) || "?"}
            </span>
          </div>
        )}
        <h4 className="text-xl font-semibold mb-2">
          {component ? (
            <UniformText parameterId="name" placeholder="Contact name" as="span" />
          ) : (
            name || "Team Member"
          )}
        </h4>
        <p className="text-muted-foreground mb-4">
          {component ? (
            <UniformText parameterId="role" placeholder="Contact role" as="span" />
          ) : (
            role || "Team Role"
          )}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {component ? (
            <UniformText parameterId="bio" placeholder="Contact bio" as="span" />
          ) : (
            bio || "Contact person bio goes here"
          )}
        </p>
      </div>
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "contactCard",
  component: ContactCard,
});

export default ContactCard;

