import type { OrderStatus } from "@/app/generated/prisma/enums";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Sipariş Alındı",
  PREPARING: "Hazırlanıyor",
  SHIPPED: "Kargoya Verildi",
  DELIVERED: "Teslim Edildi",
  CANCELLED: "İptal Edildi",
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 ring-amber-600/20",
  PREPARING: "bg-blue-50 text-blue-700 ring-blue-600/20",
  SHIPPED: "bg-violet-50 text-violet-700 ring-violet-600/20",
  DELIVERED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  CANCELLED: "bg-red-50 text-red-700 ring-red-600/20",
};

export function orderStatusLabel(status: OrderStatus | string) {
  return STATUS_LABELS[status] ?? status;
}

export default function StatusBadge({ status }: { status: OrderStatus | string }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
        STATUS_STYLES[status] ?? "bg-neutral-100 text-neutral-700 ring-neutral-500/20"
      }`}
    >
      {orderStatusLabel(status)}
    </span>
  );
}
