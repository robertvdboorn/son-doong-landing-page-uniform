import React, { useState, useEffect } from "react";
// Uniform imports for playground functionality
import { UniformPlaygroundDecorator } from "@uniformdev/canvas-react";
import { IS_RENDERED_BY_UNIFORM_ATTRIBUTE } from "@uniformdev/canvas";

/**
 * Component types supported in the playground
 * This list matches the actual components registered in the project
 * 
 * IMPORTANT: Keep this in sync with components in src/components/index.ts
 * When adding/removing components, update both ComponentType and defaultSizes
 */
type ComponentType =
  // Page Components
  | "page"
  // Layout Components
  | "navigation"
  | "footerSection"
  // Content Components
  | "hero"
  | "featuresSection"
  | "journeySection"
  | "faqSection"
  | "faqItem"
  | "contactSection"
  | "contactForm"
  | "contactCard"
  // UI Components
  | "navLink"
  | "ctaButton"
  | "featureCard"
  | "journeyPhaseCard"
  | "footerLink"
  | "footerLinkSection"
  // Form Components
  | "form"
  | "formTextField"
  | "formCheckboxField"
  | "formDropdownField"
  | "formRadioField"
  | "formButton";

/**
 * Responsive breakpoint sizes based on Tailwind CSS
 * These match common device widths for accurate responsive testing
 */
const sizes = {
  "Full Width": "100%",    // No width restriction
  "2XL": "1536px",         // Extra large desktop (1536px+)
  XL: "1280px",            // Large desktop (1280px+)
  LG: "1024px",            // Desktop/laptop (1024px+)
  MD: "768px",             // Tablet (768px+)
  SM: "640px",             // Large mobile (640px+)
  XS: "480px",             // Mobile (480px+)
  "2XS": "320px",          // Small mobile (320px+)
};

/**
 * Background color options for component preview
 * Useful for testing components with transparent/glass backgrounds
 * These match the actual project theme colors from globals.css
 */
const backgroundColors = {
  "Background": "oklch(0.97 0.01 75)",          // Light mode background
  "Card": "oklch(0.98 0.008 75)",               // Light card background
  "Muted": "oklch(0.92 0.015 75)",              // Muted background
  "Accent": "oklch(0.88 0.04 85)",              // Accent background
  "Primary": "oklch(0.35 0.08 155)",            // Primary dark green
  "Nature Gradient": "linear-gradient(135deg, oklch(0.45 0.1 155) 0%, oklch(0.35 0.08 145) 100%)", // Green gradient
  "Dark Background": "oklch(0.2 0.02 145)",     // Dark mode background
  "Dark Card": "oklch(0.25 0.025 145)",         // Dark mode card
  "Dark Muted": "oklch(0.3 0.02 145)",          // Dark mode muted
  "White": "#ffffff",                            // Pure white
  "Black": "#000000",                            // Pure black
};

/**
 * Default preview sizes for different component types
 * Each component type gets a sensible default based on its typical usage and design
 * 
 * Size Selection Guidelines:
 * - Full Width: Page layouts, navigation bars, hero sections
 * - LG (1024px): Content sections, articles, rich text
 * - MD (768px): Cards, medium content blocks
 * - SM (640px): Buttons, links, small components
 */
const defaultSizes: Record<ComponentType, keyof typeof sizes> = {
  // Page Components
  page: "Full Width",
  // Layout Components
  navigation: "Full Width",
  footerSection: "Full Width",
  // Content Components
  hero: "Full Width",
  featuresSection: "Full Width",
  journeySection: "Full Width",
  faqSection: "Full Width",
  faqItem: "LG",
  contactSection: "Full Width",
  contactForm: "MD",
  contactCard: "MD",
  // UI Components
  navLink: "SM",
  ctaButton: "SM",
  featureCard: "MD",
  journeyPhaseCard: "MD",
  footerLink: "SM",
  footerLinkSection: "MD",
  // Form Components
  form: "LG",
  formTextField: "MD",
  formCheckboxField: "MD",
  formDropdownField: "MD",
  formRadioField: "MD",
  formButton: "SM",
};

/**
 * Default background colors for different component types
 * Components with glass effects or transparent backgrounds get dark backgrounds by default
 */
const defaultBackgrounds: Record<ComponentType, keyof typeof backgroundColors> = {
  // Page Components
  page: "Background",
  // Layout Components (glass effects need dark backgrounds)
  navigation: "Black",
  footerSection: "Background",
  // Content Components
  hero: "Background",
  featuresSection: "Background",
  journeySection: "Background",
  faqSection: "Background",
  faqItem: "Background",
  contactSection: "Background",
  contactForm: "Background",
  contactCard: "Background",
  // UI Components (glass/transparent components need dark backgrounds)
  navLink: "Black",
  ctaButton: "Black",
  featureCard: "Background",
  journeyPhaseCard: "Background",
  footerLink: "Background",
  footerLinkSection: "Background",
  // Form Components
  form: "Background",
  formTextField: "Background",
  formCheckboxField: "Background",
  formDropdownField: "Background",
  formRadioField: "Background",
  formButton: "Background",
};

/**
 * Resizable Playground Decorator - Responsive Component Testing
 * 
 * This decorator enhances the Uniform playground with responsive testing capabilities
 * and background customization. It wraps components with a container that can be resized 
 * to different breakpoints and viewed against various backgrounds, allowing developers 
 * and content authors to test how components look at various screen sizes and contexts.
 * 
 * Features:
 * - Responsive breakpoint testing (320px to full width)
 * - Background color selection (solid colors and gradients)
 * - Smart default sizing based on component type
 * - Smart default background based on component type (black for glass effects)
 * - Apple-style centered UI controls
 * - Real-time size and background indicators
 * - Smooth transitions between sizes and backgrounds
 * 
 * How it works:
 * 1. Detects the component type being previewed
 * 2. Applies appropriate default size and background
 * 3. Provides UI controls to change the preview size and background
 * 4. Updates the container width and background to simulate different contexts
 * 
 * This is essential for:
 * - Testing responsive design
 * - Testing glass/transparent component backgrounds (navigation, CTAs)
 * - Ensuring components work on all devices and contexts
 * - Content author training and preview
 * - Component pattern validation
 */
export const ResizablePlaygroundDecorator: UniformPlaygroundDecorator = ({
  children,        // The component being previewed
  data,           // Component metadata from Uniform
}) => {
  // Determine component type and set appropriate default size and background
  const componentType = data?.type as ComponentType | undefined;
  const defaultSize = componentType ? defaultSizes[componentType] : "2XL";
  const defaultBackground = componentType ? defaultBackgrounds[componentType] : "Background";
  const [selectedSize, setSelectedSize] = useState(sizes[defaultSize]);
  const [selectedBackground, setSelectedBackground] = useState<string>(backgroundColors[defaultBackground]);

  // Update size and background when component type changes
  useEffect(() => {
    if (componentType) {
      const newSize = sizes[defaultSizes[componentType]];
      const newBackground = backgroundColors[defaultBackgrounds[componentType]];
      setSelectedSize(newSize);
      setSelectedBackground(newBackground);
    }
  }, [componentType]);

  return (
    <div 
      className="flex flex-col items-center min-h-screen transition-all duration-300 pb-48"
      style={{ 
        background: selectedBackground,
      }}
    >
      {/* COMPONENT PREVIEW CONTAINER: Resizable based on selected size */}
      <div 
        className="w-full relative z-0" 
        style={{ 
          maxWidth: selectedSize,
        }}
      >
        {children}
      </div>
      
      {/* RESPONSIVE CONTROLS: Apple-style size and background selectors */}
      <div className="mt-8 mb-4 space-y-4 relative z-10">
        {/* SIZE SELECTOR */}
        <div className="p-1 bg-gray-100 rounded-xl shadow-inner">
          <div className="flex flex-wrap justify-center gap-1">
            {Object.entries(sizes).map(([label, size]) => (
              <button
                key={size}
                className={`
                  px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap
                  ${selectedSize === size 
                    ? "bg-white text-ui-primary shadow-sm border border-gray-200 scale-[1.02]" 
                    : "text-gray-600 hover:text-ui-primary hover:bg-white/50"
                  }
                `}
                onClick={() => setSelectedSize(size)}
                {...{ [IS_RENDERED_BY_UNIFORM_ATTRIBUTE]: true }}
              >
                {label}
              </button>
            ))}
          </div>
          
          {/* SIZE INDICATOR: Shows current selected size with pixel value */}
          <div className="text-center mt-2 text-xs text-gray-500 font-medium">
            {Object.entries(sizes).find(([, size]) => size === selectedSize)?.[0]} 
            <span className="text-gray-400 ml-1">({selectedSize})</span>
          </div>
        </div>

        {/* BACKGROUND COLOR SELECTOR */}
        <div className="p-1 bg-gray-100 rounded-xl shadow-inner">
          <div className="flex flex-wrap justify-center gap-1">
            {Object.entries(backgroundColors).map(([label, color]) => (
              <button
                key={label}
                className={`
                  px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap
                  flex items-center gap-2
                  ${selectedBackground === color 
                    ? "bg-white text-ui-primary shadow-sm border border-gray-200 scale-[1.02]" 
                    : "text-gray-600 hover:text-ui-primary hover:bg-white/50"
                  }
                `}
                onClick={() => setSelectedBackground(color)}
                {...{ [IS_RENDERED_BY_UNIFORM_ATTRIBUTE]: true }}
              >
                {/* Color preview swatch */}
                <span 
                  className="w-4 h-4 rounded border border-gray-300 shadow-sm"
                  style={{ background: color }}
                />
                {label}
              </button>
            ))}
          </div>
          
          {/* BACKGROUND INDICATOR */}
          <div className="text-center mt-2 text-xs text-gray-500 font-medium">
            Background: {Object.entries(backgroundColors).find(([, color]) => color === selectedBackground)?.[0]}
          </div>
        </div>
      </div>
    </div>
  );
};
