import React from 'react';
import { baseStyles, stateStyles, TextInputProps } from './TextInput';
import TextInputFeedback from './InputFeedback';
import InputLabel from './InputLabel';

const textAreaBaseStyles = baseStyles.replace(
  'min-h-min',
  'min-h-[7.5rem] max-h-[15rem]'
);

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
        {label && <InputLabel inputId={inputId} label={label} />}
        <textarea
          id={inputId}
          ref={ref}
          className={[textAreaBaseStyles, stateClass, className]
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

TextArea.displayName = 'TextArea';

export default TextArea;
