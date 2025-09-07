import React from 'react';
import TextInputFeedback from './InputFeedback';
import InputLabel from './InputLabel';
import { TextInputProps } from './textInput.types';
import {
  stateStyles,
  textAreaBaseStyles,
  baseStyles,
} from './textInput.constants';

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
      disabled,
      id,
      className = '',
      required = false,
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

    const baseProps = {
      ref: ref as React.Ref<HTMLInputElement | HTMLTextAreaElement>,
      id: [props.name, inputId].join('-'),
      className: [
        as === 'textarea' ? textAreaBaseStyles : baseStyles,
        stateClass,
        className,
      ]
        .filter(Boolean)
        .join(' '),
      'aria-invalid': !!error,
      'aria-describedby': error
        ? `${inputId}-error`
        : hint
        ? `${inputId}-hint`
        : undefined,
      disabled,
      ...props,
    };

    return (
      <div className='w-full'>
        {label && (
          <InputLabel
            inputId={baseProps.id}
            label={label}
            required={required}
          />
        )}
        {as === 'textarea' ? (
          <textarea
            {...(baseProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            {...(baseProps as React.InputHTMLAttributes<HTMLInputElement>)}
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
