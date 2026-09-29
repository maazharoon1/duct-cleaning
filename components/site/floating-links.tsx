export const businessPhone = "+17085295292";
const whatsappNumber = businessPhone.replace(/\D/g, "");
// Replace this placeholder with your business's real Trustpilot profile URL.
const trustpilotUrl = "https://www.trustpilot.com/";

export function FloatingLinks() {
  return <>
    <a
      className="floating-link floating-whatsapp"
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Duct Master on WhatsApp (opens in a new tab)"
      title="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="32" height="32" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3A12.92 12.92 0 0 0 4.86 22.4L3 29l6.78-1.78A12.96 12.96 0 1 0 16.04 3Zm0 23.7a10.7 10.7 0 0 1-5.45-1.49l-.39-.23-4.02 1.06 1.07-3.92-.26-.4A10.75 10.75 0 1 1 16.04 26.7Zm5.9-8.04c-.32-.16-1.91-.94-2.2-1.05-.3-.1-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.37.24-.7.08-.32-.16-1.36-.5-2.59-1.61-.96-.86-1.6-1.92-1.79-2.25-.18-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.18.22-.32.32-.53.11-.22.06-.4-.02-.56-.08-.16-.73-1.75-1-2.4-.25-.63-.52-.54-.72-.55h-.62c-.21 0-.56.08-.86.4-.29.33-1.13 1.11-1.13 2.7s1.16 3.12 1.32 3.34c.16.21 2.29 3.49 5.54 4.89.77.33 1.38.53 1.85.68.78.25 1.48.22 2.04.13.62-.09 1.91-.78 2.18-1.53.27-.75.27-1.4.19-1.53-.08-.13-.3-.21-.62-.37Z" />
      </svg>
    </a>
    <a
      className="floating-link floating-trustpilot"
      href={trustpilotUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit Trustpilot (opens in a new tab)"
      title="Trustpilot"
    >
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <path fill="#00b67a" d="m16 1 3.6 11.1H31l-9.2 6.7L25.3 30 16 23.1 6.7 30l3.5-11.2L1 12.1h11.4Z" />
        <path fill="#005128" d="m16 23.1 6.5-1.7-1-2.6Z" />
      </svg>
      <span>Trustpilot</span>
    </a>
  </>;
}
