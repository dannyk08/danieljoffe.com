interface PillProps {
  children: React.ReactNode;
  className?: string;
}

export function Pill({ children, className = '' }: PillProps) {
  return (
    <span 
      className={`px-4 py-2 rounded-full border border-gray-300 font-body text-gray-700 ${className}`}
    >
      {children}
    </span>
  );
} 