import type { ReactNode } from 'react';

type FormFieldProps = {
  label: ReactNode;
  children: ReactNode;
  required?: boolean;
  error?: ReactNode;
};

export function FormField({ label, children, required, error }: FormFieldProps) {
  return (
    <label className="field">
      <span className="field__label">
        {label} {required && <span className="field__required">*</span>}
      </span>
      {children}
      {error && <span className="field__error">{error}</span>}
    </label>
  );
}
