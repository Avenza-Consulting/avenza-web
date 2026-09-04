import Image from "next/image";
import { clientLogos } from "@/data/content";

export function LogoGrid() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {clientLogos.map((client) => (
        <div
          key={client.id}
          className="flex h-20 w-40 items-center justify-center rounded-xl border p-3 shadow-sm transition-all duration-300 sm:h-24 sm:w-48"
          style={{ background: "#ffffff", borderColor: "rgba(10, 10, 10, 0.1)" }}
        >
          <Image
            src={client.src}
            alt={client.name}
            width={200}
            height={133}
            className="h-full w-full object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
          />
        </div>
      ))}
    </div>
  );
}
