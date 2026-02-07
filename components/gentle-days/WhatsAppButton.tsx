"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/918739012274"
      target="_blank"
      rel="noopener noreferrer"
      className="btn-whatsapp inline-flex items-center justify-center gap-2 mt-4"
    >
      <MessageCircle className="w-5 h-5" />
      Continue on WhatsApp
    </Link>
  );
}
