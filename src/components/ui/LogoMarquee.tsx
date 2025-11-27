import React, { useEffect, useRef } from "react";
import { UniformText, UniformSlot, registerUniformComponent } from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";

export interface LogoMarqueeProps {
  className?: string;
  sectionTitle?: string;
  backgroundColor?: string;
}

/**
 * Logo Marquee Component
 * 
 * An animated horizontal scrolling marquee of company logos.
 * Displays logos in a continuous loop with smooth animation.
 * 
 * Features:
 * - Infinite horizontal scroll animation
 * - Centered section title
 * - Slot for LogoItem components
 * - Automatic duplication for seamless loop
 * - Customizable background color
 * 
 * Use Cases:
 * - Client/partner logos
 * - "Trusted by" sections
 * - "As featured in" sections
 * - Social proof elements
 */
export const LogoMarquee: React.FC<LogoMarqueeProps> = ({
  className = "",
  sectionTitle: _sectionTitle = "Trusted by Enterprise Brands",
  backgroundColor = "bg-[#DCEEFF]",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clone the logo content to create seamless loop
    if (trackRef.current) {
      const track = trackRef.current;
      const items = track.children[0]; // The div containing UniformSlot
      
      if (items && items.children.length > 0) {
        // Clone all logo items for seamless loop
        const clone = items.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true'); // Hide from screen readers
        track.appendChild(clone);
      }
    }
  }, []);

  return (
    <section className={cn("py-16 overflow-hidden", backgroundColor, className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-[#001242] font-bold mb-12 text-2xl">
          <UniformText parameterId="sectionTitle" placeholder="Section title" as="span" />
        </h3>
        <div className="relative">
          <div className="logo-marquee">
            <div className="logo-track" ref={trackRef}>
              <div className="flex gap-12 pr-12">
                <UniformSlot name="logos" />
              </div>
              {/* Duplicate will be added by useEffect for seamless loop */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

registerUniformComponent({
  type: "logoMarquee",
  component: LogoMarquee,
});

export default LogoMarquee;


