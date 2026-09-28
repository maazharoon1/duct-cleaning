"use client";

import { CircleCheckIcon, CircleXIcon, InfoIcon, LoaderCircleIcon, TriangleAlertIcon } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return <Sonner theme="light" position="top-right" richColors closeButton duration={6000}
    icons={{ success: <CircleCheckIcon className="size-5" />, info: <InfoIcon className="size-5" />, warning: <TriangleAlertIcon className="size-5" />, error: <CircleXIcon className="size-5" />, loading: <LoaderCircleIcon className="size-5 animate-spin" /> }}
    toastOptions={{ style: { borderRadius: "12px", fontFamily: "inherit" } }} {...props} />;
}
