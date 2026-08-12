import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { updateOrderStatusAction, updatePaymentStatusAction } from "@/app/admin/actions";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import StatusBadge from "@/components/admin/StatusBadge";
import PaymentBadge, { paymentStatusLabel } from "@/components/admin/PaymentBadge";

type AdminOrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderDetailPage({ params }: AdminOrderDetailPageProps) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* BAŞLIK */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-neutral-500">Sipariş</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{order.orderNumber}</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {order.createdAt.toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          <PaymentBadge status={order.paymentStatus} />
        </div>
      </div>

      {/* SİPARİŞ DURUMU */}
      <section className="mb-6 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-base font-semibold">Sipariş Durumu</h2>

        <form action={updateOrderStatusAction} className="mt-4 flex flex-col gap-4 sm:flex-row">
          <input type="hidden" name="id" value={order.id} />

          <select
            name="status"
            defaultValue={order.status}
            className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3"
          >
            <option value="PENDING">Sipariş Alındı</option>
            <option value="PREPARING">Hazırlanıyor</option>
            <option value="SHIPPED">Kargoya Verildi</option>
            <option value="DELIVERED">Teslim Edildi</option>
            <option value="CANCELLED">İptal Edildi</option>
          </select>

          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-800"
          >
            Durumu Güncelle
          </button>
        </form>
      </section>

      {/* ÖDEME DURUMU */}
      <section className="mb-6 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-base font-semibold">Ödeme Durumu</h2>

        <p className="mt-2 text-sm text-neutral-500">
          Mevcut durum: <span className="font-medium text-neutral-900">{paymentStatusLabel(order.paymentStatus)}</span>
        </p>

        <form action={updatePaymentStatusAction} className="mt-4 flex flex-col gap-4 sm:flex-row">
          <input type="hidden" name="id" value={order.id} />

          <select
            name="paymentStatus"
            defaultValue={order.paymentStatus}
            className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3"
          >
            <option value="PENDING">Ödeme Bekleniyor</option>
            <option value="PAID">Ödeme Alındı</option>
            <option value="FAILED">Ödeme Başarısız</option>
            <option value="REFUNDED">İade Edildi</option>
          </select>

          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-800"
          >
            Ödemeyi Güncelle
          </button>
        </form>
      </section>

      {/* MÜŞTERİ + TESLİMAT */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-semibold">Müşteri Bilgileri</h2>

          <div className="mt-4 space-y-3 text-sm">
            <Info label="Ad Soyad" value={order.customerName} />
            <Info label="E-posta" value={order.customerEmail} />
            <Info label="Telefon" value={order.customerPhone} />
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-semibold">Teslimat Adresi</h2>

          <div className="mt-4 space-y-3 text-sm">
            <Info label="Şehir" value={order.shippingCity} />
            <Info label="İlçe" value={order.shippingDistrict} />
            <Info label="Adres" value={order.shippingAddress} />
            {order.shippingPostalCode && <Info label="Posta Kodu" value={order.shippingPostalCode} />}
          </div>
        </section>
      </div>

      {/* ÜRÜNLER */}
      <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-base font-semibold">Ürünler</h2>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-500">
                <th className="py-2 font-medium">Ürün</th>
                <th className="py-2 font-medium">SKU</th>
                <th className="py-2 font-medium">Adet</th>
                <th className="py-2 font-medium text-right">Birim Fiyat</th>
                <th className="py-2 font-medium text-right">Toplam</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 font-medium">{item.productName}</td>
                  <td className="py-3 text-neutral-500">{item.productSku}</td>
                  <td className="py-3 text-neutral-500">{item.quantity}</td>
                  <td className="py-3 text-right text-neutral-500">
                    {Number(item.unitPrice).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL
                  </td>
                  <td className="py-3 text-right font-medium">
                    {Number(item.totalPrice).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOPLAMLAR */}
        <div className="mt-6 border-t border-neutral-200 pt-6">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Ara toplam</span>
            <span>{Number(order.subtotal).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL</span>
          </div>

          <div className="mt-2 flex justify-between text-sm">
            <span className="text-neutral-500">Kargo</span>
            <span>{Number(order.shippingCost).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL</span>
          </div>

          <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-lg font-semibold">
            <span>Toplam</span>
            <span>{Number(order.total).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL</span>
          </div>
        </div>
      </section>

      <div className="mt-6">
        <Link
          href="/admin/orders"
          className="cursor-pointer text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          ← Siparişlere dön
        </Link>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-neutral-500">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
