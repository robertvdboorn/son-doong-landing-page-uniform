import React from 'react';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import { useFormContext } from '../context/FormContext';
import { sanitizeName } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import { DropdownOption } from '../form-types';

function FormDropdownField({
  name,
  label,
  options,
  required = false,
}: {
  name?: string;
  label?: string;
  options?: DropdownOption[];
  required?: boolean;
}) {
  const { formData, handleInputChange } = useFormContext();
  const identifier = name && name.length > 0 ? sanitizeName(name) : uuidv4();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleInputChange(identifier, e.target.value);
  };

  return (
    <div className="mb-6">
      <label htmlFor={identifier} className="block text-sm font-medium text-foreground mb-2">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <select
        id={identifier}
        name={identifier}
        required={required}
        value={formData[identifier]?.value || ''}
        onChange={handleChange}
        aria-invalid={required && !formData[identifier]?.value}
        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      >
        {options?.map((option, index) => {
          const { fields } = option;

          // Default values for isDefault, isHidden, and isDisabled if options field doesn't exist
          const isDefault = Array.isArray(fields?.options?.value) && fields.options.value.includes('default');
          const isHidden = Array.isArray(fields?.options?.value) && fields.options.value.includes('hidden');
          const isDisabled = Array.isArray(fields?.options?.value) && fields.options.value.includes('disabled');

          // Determine the value of the option
          const optionValue = isDisabled && isHidden && isDefault ? '' : fields?.value?.value || '';

          return (
            <option key={index} value={optionValue} disabled={isDisabled} hidden={isHidden}>
              {fields?.label?.value || ''}
            </option>
          );
        })}
      </select>
    </div>
  );
}

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "formDropdownField",
  component: FormDropdownField,
});

export default FormDropdownField;

