import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import StatCard from "@/components/admin/StatCard";
import StatusBadge from "@/components/admin/StatusBadge";
import PaymentBadge from "@/components/admin/PaymentBadge";

export default async function AdminPage() {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const [
    productCount,
    categoryCount,
    orderCount,
    userCount,
    pendingCount,
    preparingCount,
    shippedCount,
    deliveredCount,
    recentOrders,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "PREPARING" } }),
    prisma.order.count({ where: { status: "SHIPPED" } }),
    prisma.order.count({ where: { status: "DELIVERED" } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        _count: {
          select: { items: true },
        },
      },
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Yönetim Paneli</h1>
        <p className="mt-1 text-neutral-500">Mağazanı buradan yöneteceksin.</p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Toplam Ürün" value={productCount} href="/admin/products" />
        <StatCard title="Toplam Kategori" value={categoryCount} href="/admin/categories" />
        <StatCard title="Toplam Sipariş" value={orderCount} href="/admin/orders" />
        <StatCard title="Kullanıcılar" value={userCount} hint="Kullanıcı yönetimi yakında" />
      </section>

      <section className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Bekleyen Siparişler" value={pendingCount} href="/admin/orders" />
        <StatCard title="Hazırlanan Siparişler" value={preparingCount} href="/admin/orders" />
        <StatCard title="Kargodaki Siparişler" value={shippedCount} href="/admin/orders" />
        <StatCard title="Teslim Edilen Siparişler" value={deliveredCount} href="/admin/orders" />
      </section>

      <section className="mt-8 rounded-2xl border border-neutral-200 bg-white">
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <h2 className="text-lg font-semibold">Son Siparişler</h2>
          <Link href="/admin/orders" className="cursor-pointer text-sm font-medium text-neutral-600 hover:text-neutral-900">
            Tümünü gör →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="px-6 py-10 text-center text-neutral-500">Henüz sipariş yok.</div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex cursor-pointer flex-col gap-2 px-6 py-4 transition hover:bg-neutral-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-sm text-neutral-500">
                    {order.customerName} · {order._count.items} kalem
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="font-semibold">
                    {Number(order.total).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL
                  </p>
                  <StatusBadge status={order.status} />
                  <PaymentBadge status={order.paymentStatus} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
