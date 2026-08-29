import { CruiseBackground } from "@/components/cruise/CruiseBackground";

export function NightField({
  photo = false,
  className,
}: {
  photo?: boolean;
  className?: string;
}) {
  return (
    <CruiseBackground
      photo={photo}
      density={photo ? "cover" : "default"}
      position="absolute"
      className={className}
    />
  );
}

export function CoverFrame() {
  return (
    <div className="cover-frame pointer-events-none absolute inset-3 z-[1] border border-danfo/40 md:inset-5 md:left-[17.25rem]">
      <span className="crop-mark crop-tl" />
      <span className="crop-mark crop-tr" />
      <span className="crop-mark crop-bl" />
      <span className="crop-mark crop-br" />
    </div>
  );
}

export function SiteAtmosphere() {
  return <CruiseBackground density="quiet" position="fixed" />;
}
