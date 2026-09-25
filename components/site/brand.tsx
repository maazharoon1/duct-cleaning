import Image from "next/image";

export function Brand() {
  return <span className="brand" aria-label="Duct Master">
    <Image className="brand-symbol" src="/images/logo-symbol.png" alt="" width={180} height={177} />
    <Image className="brand-wordmark" src="/images/logo-wordmark.png" alt="Duct Master — Clean Air. Better Living." width={1150} height={264} />
  </span>;
}
