interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = '',
}: ContainerProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className={`container flex flex-col py-14 px-4 max-w-[42.5rem]`}>
        {children}
      </div>
    </div>
  );
}
