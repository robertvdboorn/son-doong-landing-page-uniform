import React from 'react';
import { registerUniformComponent } from '@uniformdev/canvas-react';

function FormButton({ label }: { label?: string }) {
  return (
    <button
      type="submit"
      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 py-3 font-semibold shadow-lg transition-colors"
    >
      {label || 'Submit'}
    </button>
  );
}

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "formButton",
  component: FormButton,
});

export default FormButton;

