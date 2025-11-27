import React from "react";
import { UniformText, UniformSlot, registerUniformComponent } from "@uniformdev/canvas-react";
import { FormProvider } from "@/components/form/context/FormContext";
import { cn } from "@/lib/utils";

export interface ContactFormProps {
  component?: any;
  title?: string;
  formIdentifier?: string;
  className?: string;
}

/**
 * ContactForm - Dynamic Contact Inquiry Form Component
 * 
 * A dynamic contact form that uses the Form system with customizable fields.
 * Designed to be used within the Contact Section component.
 * 
 * Features:
 * - Dynamic form fields via slots (add text fields, checkboxes, etc.)
 * - Form state management via FormProvider
 * - Editable form title
 * - Rounded modern styling
 * - Full form submission handling
 * 
 * Slots:
 * - formFields: Add form field components (FormTextField, FormCheckboxField, etc.)
 * - formButtons: Add form button components (FormButton for submit/reset)
 * 
 * Use Cases:
 * - Contact forms
 * - Inquiry forms
 * - Feedback forms
 * - General contact collection
 */
export const ContactForm: React.FC<ContactFormProps> = ({
  component,
  title,
  formIdentifier,
  className = "",
}) => {
  // Extract form elements from slots for FormProvider initialization
  const formElements = component?.slots?.formFields || [];

  return (
    <div className={cn("rounded-3xl border border-border bg-accent/30 p-6", className)}>
      <h3 className="text-xl font-semibold mb-6">
        {component ? (
          <UniformText parameterId="title" placeholder="Form title" as="span" />
        ) : (
          title || "Send Inquiry"
        )}
      </h3>
      
      <FormProvider initialFormElements={formElements}>
        <form className="space-y-4" data-form-identifier={formIdentifier || "contact-form"}>
          {/* Dynamic form fields */}
          <UniformSlot name="formFields" />
          
          {/* Form buttons (submit, reset, etc.) */}
          <UniformSlot name="formButtons" />
        </form>
      </FormProvider>
    </div>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "contactForm",
  component: ContactForm,
});

export default ContactForm;

