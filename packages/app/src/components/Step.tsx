import { FC } from 'react';

export const Step: FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <div className="border-base-300 bg-base-200 rounded-xl border p-6 shadow-sm">
      <h3 className="text-base-content mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-base-content opacity-80">{description}</p>
    </div>
  );
};
