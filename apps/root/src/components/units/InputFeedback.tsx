const baseStyles = 'mt-1 px-2 py-1 text-sm font-sans font-medium';

const styles = {
  error: 'bg-rose-500 text-white',
  success: 'bg-blue-500 text-white',
  hint: 'bg-neutral-200 text-neutral-900',
};

export default function InputFeedback({
  inputId,
  message,
  type,
}: {
  inputId: string;
  message: string;
  type: 'error' | 'success' | 'hint';
}) {
  return (
    <p
      id={`${inputId}-${type}`}
      className={[baseStyles, styles[type]].join(' ')}
    >
      {message}
    </p>
  );
}
