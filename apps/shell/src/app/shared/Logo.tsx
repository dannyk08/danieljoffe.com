import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Link to="/" className="text-2xl font-bold">
        <img src="/assets/logo.svg" alt="Logo" className="h-10" />
      </Link>
    </div>
  );
}
