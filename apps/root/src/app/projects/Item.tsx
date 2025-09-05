export default function WorkItem({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className='flex flex-col gap-4 h-full w-full overflow-hidden min-h-[20rem]'>
      <div
        className={[
          'flex flex-col gap-4 h-full w-full p-4',
          'bg-neutral-900/25 backdrop-blur-md shadow-lg',
        ].join(' ')}
      >
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
