interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function Container({
  children,
  className = '',
  containerClassName = '',
}: ContainerProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className={`container flex flex-col py-14 px-4 max-w-[56rem] ${containerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
