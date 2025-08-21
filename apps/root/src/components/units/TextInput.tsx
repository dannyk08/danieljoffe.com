import React from 'react';
import TextInputFeedback from './InputFeedback';
import InputLabel from './InputLabel';

export type TextInputProps<T = HTMLInputElement> =
  React.InputHTMLAttributes<T> & {
    label?: string;
    error?: string;
    hint?: string;
    success?: boolean;
    className?: string;
  };

export const baseStyles = [
  'flex w-full rounded-md border px-4',
  'py-2 text-sm transition focus:outline-none',
  'focus:ring-2 font-mono min-h-min',
].join(' ');

export const stateStyles = {
  default:
    'border-neutral-300 bg-neutral-100 focus:border-blue-600 focus:ring-blue-400',
  error:
    'border-rose-500 bg-neutral-100 placeholder-rose-400 focus:border-rose-600 focus:ring-rose-400 aria-invalid',
  success:
    'border-blue-500 bg-neutral-100 placeholder-blue-400 focus:border-blue-600 focus:ring-blue-400',
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
        {label && <InputLabel inputId={inputId} label={label} />}
        <input
          id={inputId}
          ref={ref}
          className={[baseStyles, stateClass, className]
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
          <TextInputFeedback inputId={inputId} message={error} type="error" />
        ) : hint ? (
          <TextInputFeedback inputId={inputId} message={hint} type="hint" />
        ) : null}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
export default TextInput;
