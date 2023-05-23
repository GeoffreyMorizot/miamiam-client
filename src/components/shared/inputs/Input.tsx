import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="form-group">
        <label className="input__label" htmlFor="field">
          {label}
        </label>
        <input className="input" ref={ref} {...props} />
      </div>
    );
  }
);
