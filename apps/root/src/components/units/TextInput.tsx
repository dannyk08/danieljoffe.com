import React from 'react';
import TextInputFeedback from './InputFeedback';
import InputLabel from './InputLabel';

type BaseTextInputProps = {
  label?: string;
  error?: string | undefined;
  hint?: string;
  success?: boolean;
  className?: string;
  as?: 'input' | 'textarea';
};

type TextInputAsInputProps = BaseTextInputProps & {
  as?: 'input';
} & React.InputHTMLAttributes<HTMLInputElement>;

type TextInputAsTextareaProps = BaseTextInputProps & {
  as: 'textarea';
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type TextInputProps = TextInputAsInputProps | TextInputAsTextareaProps;

export const baseStyles = [
  'flex w-full rounded-md border px-4',
  'py-2 text-sm transition focus:outline-none',
  'focus:ring-2 font-mono min-h-min',
  'border-2',
].join(' ');

export const textAreaBaseStyles = baseStyles.replace(
  'min-h-min',
  'min-h-[7.5rem] max-h-[15rem]'
);

export const stateStyles = {
  default:
    'border-neutral-300 bg-neutral-100 focus:border-blue-500 focus:ring-blue-400',
  error:
    'border-rose-500 bg-neutral-100 placeholder-rose-400 focus:border-rose-500 focus:ring-rose-400 aria-invalid',
  success:
    'border-blue-500 bg-neutral-100 placeholder-blue-400 focus:border-blue-500 focus:ring-blue-400 aria-valid',
  disabled:
    'border-neutral-200 bg-neutral-100 text-neutral-400 placeholder-neutral-300 cursor-not-allowed',
};

const TextInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextInputProps
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
      required,
      as = 'input',
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    let stateClass = stateStyles.default;

    if (label == null || label === '') {
      throw new Error('Label is required');
    }

    if (disabled) {
      stateClass = stateStyles.disabled;
    } else if (error) {
      stateClass = stateStyles.error;
    } else if (success) {
      stateClass = stateStyles.success;
    }

    const baseClassName = as === 'textarea' ? textAreaBaseStyles : baseStyles;
    const elementId = [props.name, inputId].join('-');

    return (
      <div className='w-full'>
        {label && (
          <InputLabel
            inputId={elementId}
            label={label}
            required={required || false}
          />
        )}
        {as === 'textarea' ? (
          <textarea
            id={elementId}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={[baseClassName, stateClass, className]
              .filter(Boolean)
              .join(' ')}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            disabled={disabled}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={elementId}
            ref={ref as React.Ref<HTMLInputElement>}
            className={[baseClassName, stateClass, className]
              .filter(Boolean)
              .join(' ')}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            disabled={disabled}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error ? (
          <TextInputFeedback inputId={inputId} message={error} type='error' />
        ) : hint ? (
          <TextInputFeedback inputId={inputId} message={hint} type='hint' />
        ) : null}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
export default TextInput;
