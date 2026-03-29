import Image from "next/image";

interface IPhoneFrameProps {
  src: string;
  alt: string;
  accentColor?: string;
  priority?: boolean;
}

export default function IPhoneFrame({
  src,
  alt,
  accentColor = "#4DFFED",
  priority = false,
}: IPhoneFrameProps) {
  return (
    <div
      className="relative mx-auto select-none"
      style={{
        width: "270px",
        height: "585px",
        borderRadius: "44px",
        background: "#060606",
        boxShadow: `
          0 0 0 1px #2a2a2a,
          0 0 0 2px #111,
          0 40px 100px rgba(0,0,0,0.9),
          0 0 80px ${accentColor}22
        `,
        padding: "10px",
      }}
    >
      {/* Side buttons (decorative) */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: "-3px",
          top: "100px",
          width: "3px",
          height: "32px",
          background: "#1a1a1a",
          borderRadius: "2px 0 0 2px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: "-3px",
          top: "144px",
          width: "3px",
          height: "60px",
          background: "#1a1a1a",
          borderRadius: "2px 0 0 2px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          right: "-3px",
          top: "144px",
          width: "3px",
          height: "80px",
          background: "#1a1a1a",
          borderRadius: "0 2px 2px 0",
        }}
      />

      {/* Screen */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "34px",
          background: "#080808",
        }}
      >
        {/* Dynamic Island */}
        <div
          aria-hidden="true"
          className="absolute top-2.5 left-1/2 -translate-x-1/2 z-10"
          style={{
            width: "90px",
            height: "26px",
            background: "#000",
            borderRadius: "13px",
          }}
        />

        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          priority={priority}
          sizes="270px"
        />
      </div>
    </div>
  );
}
