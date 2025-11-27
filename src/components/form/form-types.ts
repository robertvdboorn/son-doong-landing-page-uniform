export type DropdownOptionValue = 'default' | 'hidden' | 'disabled';

export type RadioOptionValue = 'default' | 'hidden' | 'disabled';

export type FormFieldType =
  | 'formTextField'
  | 'formDropdownField'
  | 'formCheckboxField'
  | 'formRadioField';

export type FormButtonType = 'formButton';

export type TextInputType = 'text' | 'email' | 'password';

export interface BaseFormElementFields {
  identifier?: {
    value: string;
  };
  label?: {
    value: string;
  };
}

export interface RequiredFormElementFields extends BaseFormElementFields {
  required?: {
    value: boolean;
  };
}

export interface DropdownOptionFields extends BaseFormElementFields {
  value?: {
    value: string;
  };
  options?: {
    value: DropdownOptionValue[]; // e.g., ["default", "hidden", "disabled"]
  };
}

export interface RadioOptionFields extends BaseFormElementFields {
  value?: {
    value: string;
  };
  options?: {
    value: RadioOptionValue[]; // e.g., ["default", "hidden", "disabled"]
  };
}

export interface TextFieldFields extends RequiredFormElementFields {
  type?: {
    value: TextInputType;
  };
  placeholder?: {
    value: string;
  };
}

export interface DropdownFieldFields extends RequiredFormElementFields {
  options?: {
    value: DropdownOption[];
  };
}

export type CheckboxFieldFields = RequiredFormElementFields;

export interface RadioFieldFields extends RequiredFormElementFields {
  options?: {
    value: RadioOption[];
  };
}

export interface ButtonFields extends BaseFormElementFields {}

export type AnyFormFieldElementFields =
  | TextFieldFields
  | DropdownFieldFields
  | CheckboxFieldFields
  | RadioFieldFields
  | DropdownOptionFields;

export type AnyFormElementFields = AnyFormFieldElementFields | ButtonFields;

export interface FormFieldElement {
  type: FormFieldType;
  fields?: AnyFormFieldElementFields;
  index?: number;
}

export interface FormButtonElement {
  type: FormButtonType;
  fields?: ButtonFields;
  index?: number;
}

export type FormElement = FormFieldElement | FormButtonElement;

export interface DropdownOption {
  fields?: DropdownOptionFields;
}

export interface RadioOption {
  fields?: RadioOptionFields;
}

export interface FormState {
  [key: string]: {
    index?: number;
    value?: string;
  };
}

export type FormAction =
  | { type: 'SET_VALUE'; payload: { name: string; value: string } }
  | { type: 'RESET'; payload: FormState };

export interface BaseFormEventActionFields {
  name?: {
    value: string;
  };
}

export interface FormSetQuirkActionFields extends BaseFormEventActionFields {
  quirkName?: {
    value: string;
  };
  quirkValue?: {
    value: string;
  };
}

export type AnyFormEventActionFields = FormSetQuirkActionFields;

export interface FormEventAction {
  type: string;
  fields?: AnyFormEventActionFields;
}

