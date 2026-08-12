import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import StatusBadge from "@/components/admin/StatusBadge";
import PaymentBadge from "@/components/admin/PaymentBadge";

export default async function AdminOrdersPage() {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          items: true,
        },
      },
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Siparişler</h1>
        <p className="mt-1 text-neutral-500">Gelen siparişleri buradan takip et.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {orders.length === 0 ? (
          <div className="px-6 py-16 text-center text-neutral-500">Henüz sipariş yok.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                  <th className="px-4 py-3 font-medium">Sipariş No</th>
                  <th className="px-4 py-3 font-medium">Müşteri</th>
                  <th className="px-4 py-3 font-medium">Tarih</th>
                  <th className="px-4 py-3 font-medium">Kalem</th>
                  <th className="px-4 py-3 font-medium">Toplam</th>
                  <th className="px-4 py-3 font-medium">Ödeme</th>
                  <th className="px-4 py-3 font-medium">Durum</th>
                  <th className="px-4 py-3 font-medium text-right">Detay</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {orders.map((order) => (
                  <tr key={order.id} className="transition hover:bg-neutral-50">
                    <td className="px-4 py-3 font-medium">{order.orderNumber}</td>
                    <td className="px-4 py-3 text-neutral-600">{order.customerName}</td>
                    <td className="px-4 py-3 text-neutral-600">
                      {order.createdAt.toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{order._count.items} kalem</td>
                    <td className="px-4 py-3 font-medium">
                      {Number(order.total).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL
                    </td>
                    <td className="px-4 py-3">
                      <PaymentBadge status={order.paymentStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="cursor-pointer text-sm font-medium text-neutral-700 hover:text-neutral-900"
                      >
                        Detay →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
