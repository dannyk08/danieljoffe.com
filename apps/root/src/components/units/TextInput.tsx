import React from 'react';

export type TextInputProps<T = HTMLInputElement> =
  React.InputHTMLAttributes<T> & {
    label?: string;
    error?: string;
    hint?: string;
    success?: boolean;
    className?: string;
  };

export const baseStyles =
  'flex w-full rounded-md border px-4 py-2 text-sm transition focus:outline-none focus:ring-2 font-mono';

export const stateStyles = {
  default:
    'border-neutral-300 bg-white focus:border-blue-600 focus:ring-blue-400',
  error:
    'border-rose-500 bg-white placeholder-rose-400 focus:border-rose-600 focus:ring-rose-400',
  success:
    'border-blue-500 bg-white placeholder-blue-400 focus:border-blue-600 focus:ring-blue-400',
  disabled:
    'border-neutral-200 bg-neutral-100 text-neutral-400 placeholder-neutral-300 cursor-not-allowed',
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    { label, error, hint, success, className = '', disabled, id, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    let stateClass = stateStyles.default;

    if (disabled) {
      stateClass = stateStyles.disabled;
    } else if (error) {
      stateClass = stateStyles.error;
    } else if (success) {
      stateClass = stateStyles.success;
    }

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-1 text-base font-medium font-sans"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={[
            baseStyles,
            stateClass,
            className,
            error ? 'aria-invalid' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          disabled={disabled}
          {...props}
        />
        {error ? (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-rose-600 font-sans"
          >
            {error}
          </p>
        ) : hint ? (
          <p
            id={`${inputId}-hint`}
            className="mt-1 text-sm text-neutral-500 font-sans"
          >
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
export default TextInput;
