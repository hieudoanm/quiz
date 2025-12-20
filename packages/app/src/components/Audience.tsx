import { FC } from 'react';

export const Audience: FC<{ title: string; items: string[] }> = ({
  title,
  items,
}) => {
  return (
    <div className="border-base-300 bg-base-200 rounded-xl border p-8 shadow-sm">
      <h3 className="text-base-content mb-4 text-2xl font-semibold">{title}</h3>
      <ul className="text-base-content space-y-2 opacity-80">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
};
