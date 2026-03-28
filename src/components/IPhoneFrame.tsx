import Image from "next/image";

interface IPhoneFrameProps {
  src: string;
  alt: string;
  accentColor?: string;
}

export default function IPhoneFrame({ src, alt, accentColor = "#4DFFED" }: IPhoneFrameProps) {
  return (
    <div
      className="relative mx-auto select-none"
      style={{
        width: "280px",
        height: "560px",
        borderRadius: "40px",
        border: "8px solid #1a1a1a",
        background: "#0a0a0a",
        boxShadow: `0 0 0 1px #333, 0 32px 80px rgba(0,0,0,0.8), 0 0 60px ${accentColor}18`,
      }}
    >
      {/* Dynamic Island / Notch */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
        style={{
          width: "88px",
          height: "24px",
          background: "#0a0a0a",
          borderRadius: "0 0 14px 14px",
        }}
      />

      {/* Screen */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "32px",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={264}
          height={544}
          className="w-full h-full object-cover"
          priority={false}
        />
      </div>
    </div>
  );
}
