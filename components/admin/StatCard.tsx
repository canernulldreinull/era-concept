import Link from "next/link";
import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: number | string;
  href?: string;
  icon?: ReactNode;
  hint?: string;
};

export default function StatCard({ title, value, href, icon, hint }: StatCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-neutral-500">{title}</p>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
            {icon}
          </div>
        )}
      </div>

      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>

      {href ? (
        <p className="mt-4 text-sm font-medium text-neutral-900">Yönet →</p>
      ) : hint ? (
        <p className="mt-4 text-sm text-neutral-400">{hint}</p>
      ) : null}
    </>
  );

  const className =
    "block rounded-2xl border border-neutral-200 bg-white p-5 transition";

  if (href) {
    return (
      <Link
        href={href}
        className={`${className} cursor-pointer hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm`}
      >
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
