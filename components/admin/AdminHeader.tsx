type AdminHeaderProps = {
  title?: string;
  email?: string;
};

export default function AdminHeader({ title = "Yönetim Paneli", email }: AdminHeaderProps) {
  return (
    <header className="hidden h-16 items-center justify-between border-b border-neutral-200 bg-white px-6 lg:flex">
      <p className="text-sm font-medium text-neutral-500">{title}</p>

      {email && (
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
            {email.slice(0, 1).toUpperCase()}
          </span>
          {email}
        </div>
      )}
    </header>
  );
}
