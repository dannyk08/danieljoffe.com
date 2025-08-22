export default function InputLabel({
  inputId,
  label,
  required,
}: {
  inputId: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={inputId}
      className="block mb-1 text-base font-medium font-sans"
    >
      {label}
      {required && <sup className="text-red-500">*</sup>}
    </label>
  );
}
