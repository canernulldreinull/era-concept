import type { PaymentStatus } from "@/app/generated/prisma/enums";

const PAYMENT_LABELS: Record<string, string> = {
  PENDING: "Ödeme Bekleniyor",
  PAID: "Ödeme Alındı",
  FAILED: "Ödeme Başarısız",
  REFUNDED: "İade Edildi",
};

const PAYMENT_STYLES: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 ring-amber-600/20",
  PAID: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  FAILED: "bg-red-50 text-red-700 ring-red-600/20",
  REFUNDED: "bg-neutral-100 text-neutral-700 ring-neutral-500/20",
};

export function paymentStatusLabel(status: PaymentStatus | string) {
  return PAYMENT_LABELS[status] ?? status;
}

export default function PaymentBadge({ status }: { status: PaymentStatus | string }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
        PAYMENT_STYLES[status] ?? "bg-neutral-100 text-neutral-700 ring-neutral-500/20"
      }`}
    >
      {paymentStatusLabel(status)}
    </span>
  );
}
