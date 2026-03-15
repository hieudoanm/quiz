import { FC } from 'react';
import Link from 'next/link';

export const Navbar: FC = () => {
  return (
    <nav className="bg-base-100 px-6 py-4 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-base-content text-xl font-bold">
          Quiz App
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/play" className="btn btn-sm btn-primary">
            ▶️ Play
          </Link>
          <Link href="/create" className="btn btn-sm btn-primary">
            ✍️ Create
          </Link>
          <Link href="/share" className="btn btn-sm btn-primary">
            🔗 Share
          </Link>
        </div>
      </div>
    </nav>
  );
};
