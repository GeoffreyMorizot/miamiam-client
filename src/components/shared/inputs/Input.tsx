import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  field: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, field, name, ...props }, ref) => {
    return (
      <div className="form-group">
        <label className="input__label" htmlFor={field}>
          {label}
        </label>
        <input className="input" name={field} id={field} ref={ref} {...props} />
      </div>
    );
  }
);
