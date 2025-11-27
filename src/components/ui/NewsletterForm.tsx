import React, { useState } from "react";
import { UniformText } from "@uniformdev/canvas-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NewsletterFormProps {
  component?: any;
  title?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

/**
 * NewsletterForm - Email Newsletter Signup Form
 * 
 * A compact newsletter signup form with email input and submit button.
 * Includes basic form handling and validation.
 * 
 * Features:
 * - Email validation (HTML5)
 * - Uniform text editing for title, placeholder, and button text
 * - Form state management
 * - Accessible form elements
 * - Responsive layout
 * 
 * Use Cases:
 * - Footer newsletter signup
 * - Email capture forms
 * - Subscription forms
 */
export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  component,
  title,
  placeholder,
  buttonText,
  className = "",
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div className={cn("border-t border-primary/10 pt-10 mb-10", className)}>
      <div className="max-w-md">
        <h3 className="text-base font-semibold mb-4 text-primary">
          {component ? (
            <UniformText parameterId="title" placeholder="Newsletter title" as="span" />
          ) : (
            title || "Get Updates"
          )}
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              component ? "Enter your email" : (placeholder || "Enter your email")
            }
            required
            className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all"
          />
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 h-[50px] shadow-md font-medium w-full sm:w-auto"
          >
            <span>
              {component ? (
                <UniformText parameterId="buttonText" placeholder="Subscribe" as="span" />
              ) : (
                buttonText || "Subscribe"
              )}
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterForm;

