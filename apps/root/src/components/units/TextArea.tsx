import React from 'react';
import { baseStyles, stateStyles, TextInputProps } from './TextInput';

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextInputProps<HTMLTextAreaElement>
>(
  (
    {
      label,
      error,
      hint,
      success,
      className = '',
      disabled,
      id,
      ...props
    }: TextInputProps<HTMLTextAreaElement>,
    ref: React.Ref<HTMLTextAreaElement>
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
        <textarea
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

TextArea.displayName = 'TextArea';

export default TextArea;
