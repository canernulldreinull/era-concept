import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50 lg:pl-64">
      <AdminSidebar />
      <AdminHeader email={session.email} />
      <div>{children}</div>
    </div>
  );
}
