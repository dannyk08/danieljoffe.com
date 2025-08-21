export default function InputLabel({
  inputId,
  label,
}: {
  inputId: string;
  label: string;
}) {
  return (
    <label
      htmlFor={inputId}
      className="block mb-1 text-base font-medium font-sans"
    >
      {label}
    </label>
  );
}
