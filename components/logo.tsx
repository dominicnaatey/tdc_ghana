import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-8 max-w-[10.847rem]">
      <Image
        src="/tdc_logo.png"
        width={173}
        height={32}
        className="object-contain"
        alt="TDC Ghana Ltd Logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}