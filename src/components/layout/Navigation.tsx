import React, { useEffect } from "react";
import { UniformText, UniformSlot, registerUniformComponent, useUniformCurrentComposition } from "@uniformdev/canvas-react";
import { Leaf, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobileMenu } from "@/contexts/MobileMenuContext";

export interface NavigationProps {
  component?: any;
  logoText?: string;
  showAuth?: boolean;
  ctaText?: string;
  className?: string;
}

/**
 * Navigation - Main Navigation Header Component
 * 
 * A full-featured navigation header with glass morphism styling, perfect for
 * nature-themed websites. Features a logo area, navigation links slot, and
 * action buttons.
 * 
 * Features:
 * - Glass morphism effect with backdrop blur
 * - Floating design with rounded pill shapes
 * - Responsive mobile menu with hamburger icon
 * - Collapsible mobile navigation drawer
 * - Uniform slots for dynamic navigation links
 * - Editable logo text and CTA button
 * - Optional authentication button
 * - Smart positioning (relative in preview, absolute in production)
 * 
 * Slots:
 * - navigationLinks: Center navigation links (hidden on mobile, shown in drawer)
 * 
 * Use Cases:
 * - Main site header
 * - Overlay navigation on hero sections
 * - Fixed or absolute positioned navigation
 * 
 * Responsive Behavior:
 * - Mobile (< lg): Hamburger menu + logo icon only + CTA (text hidden for space)
 * - Mobile (open): Navigation links appear in collapsible drawer below
 * - Desktop (≥ lg): Full logo text + horizontal nav links + auth button + CTA
 * 
 * Layout Structure:
 * - Left: Hamburger (mobile) + Logo (icon always, text on desktop only)
 * - Center: Navigation links (desktop only)
 * - Right: Login button (desktop only) + CTA button (always)
 * 
 * Positioning:
 * - Pattern/Preview Mode: Uses relative positioning for proper layout testing
 * - Production Mode: Uses absolute positioning to overlay on hero sections
 */
export const Navigation: React.FC<NavigationProps> = ({
  component,
  logoText,
  ctaText,
  showAuth = false,
  className = "",
}) => {
  // Mobile menu state management
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu();
  
  // Detect if we're in Uniform pattern preview mode for navigation
  const { data } = useUniformCurrentComposition();
  const isNavigationPattern = data?.type === "navigation";
  
  // Use relative positioning in pattern mode, absolute in production
  const positionClasses = isNavigationPattern 
    ? "relative" 
    : "absolute top-0 left-0 right-0 z-20";
  
  // Close mobile menu on link click
  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if clicked element is a link inside mobile menu
      if (target.tagName === 'A' && target.closest('.mobile-navigation-context')) {
        closeMobileMenu();
      }
    };
    
    // Add a small delay before attaching listeners to avoid race conditions
    let timeoutId: NodeJS.Timeout;
    
    if (isMobileMenuOpen) {
      timeoutId = setTimeout(() => {
        document.addEventListener('click', handleLinkClick);
      }, 100);
    }
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);
  
  // Handle hamburger button click with event propagation prevention
  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleMobileMenu();
  };
  
  return (
    <nav className={cn(positionClasses, className)}>
      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between p-6">
        {/* Left Section - Mobile Menu OR Logo */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <button
            onClick={handleMenuToggle}
            className="lg:hidden p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
            type="button"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>

          {/* Logo - Icon only on mobile, full on desktop */}
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
            <Leaf className="w-5 h-5 text-white" />
            <span className="hidden lg:inline font-medium text-white">
              {component ? (
                <UniformText parameterId="logoText" placeholder="Site name" as="span" />
              ) : (
                logoText || "Site Name"
              )}
            </span>
          </div>
        </div>

        {/* Center - Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-2">
          <UniformSlot name="navigationLinks" />
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center gap-3">
          {showAuth && (
            <a href="#" className="hidden lg:block px-5 py-2.5 rounded-full transition-colors font-medium bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white">
              Login
            </a>
          )}
          <a href="#" className="px-5 py-2.5 rounded-full transition-colors font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl">
            {component ? (
              <span>
                <UniformText parameterId="ctaText" placeholder="CTA text" as="span" />
              </span>
            ) : (
              ctaText || "Book Now"
            )}
          </a>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div 
        className={cn(
          "lg:hidden border-t border-white/20 bg-black/20 backdrop-blur-md origin-top transition-all duration-150",
          isMobileMenuOpen 
            ? "scale-y-100 opacity-100" 
            : "scale-y-0 opacity-0 h-0"
        )}
      >
        <div className="px-6 pb-6 pt-4">
          <div className="flex flex-col gap-3 mobile-navigation-context">
            <UniformSlot name="navigationLinks" />
            {showAuth && (
              <a href="#" className="w-full text-center px-5 py-3 rounded-full transition-colors font-medium bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white mt-2">
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "navigation",
  component: Navigation,
});

export default Navigation;

