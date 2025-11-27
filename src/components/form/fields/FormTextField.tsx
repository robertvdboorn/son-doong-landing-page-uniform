import React from 'react';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import { useFormContext } from '../context/FormContext';
import { sanitizeName } from '../helpers';
import { v4 as uuidv4 } from 'uuid';

function FormTextField({
  name,
  label,
  placeholder = '',
  type = 'text',
  rows = 1,
  required = false,
}: {
  name?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  rows?: number;
  required?: boolean;
}) {
  const { formData, handleInputChange } = useFormContext();
  const identifier = name && name.length > 0 ? sanitizeName(name) : uuidv4();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(identifier, e.target.value);
  };

  // Check if this is a multiline field (rows > 1)
  const isMultiline = rows > 1;

  return (
    <div>
      {isMultiline ? (
        <textarea
          id={identifier}
          name={identifier}
          placeholder={placeholder}
          required={required}
          value={formData[identifier]?.value || ''}
          onChange={(e) => handleInputChange(identifier, e.target.value)}
          aria-invalid={required && !formData[identifier]?.value}
          rows={rows}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-y"
        />
      ) : (
        <input
          id={identifier}
          name={identifier}
          placeholder={placeholder}
          required={required}
          type={type}
          value={formData[identifier]?.value || ''}
          onChange={handleChange}
          aria-invalid={required && !formData[identifier]?.value}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      )}
    </div>
  );
}

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "formTextField",
  component: FormTextField,
});

export default FormTextField;

