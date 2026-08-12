"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phone = "905323966634";

  const message =
    "Merhaba, Era Mobilya ürünleri hakkında bilgi almak istiyorum.";

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      title="WhatsApp ile iletişime geç"
      className="
        fixed bottom-6 right-6 z-50
        flex h-[60px] w-[60px]
        items-center justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-[0_8px_30px_rgba(0,0,0,0.18)]
        transition-all duration-200
        hover:scale-110
        hover:bg-[#20bd5a]
        hover:shadow-[0_10px_35px_rgba(0,0,0,0.25)]
        active:scale-95
      "
    >
      <FaWhatsapp className="h-8 w-8" />
    </a>
  );
}
