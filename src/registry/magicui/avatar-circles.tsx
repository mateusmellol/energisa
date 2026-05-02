import { cn } from "@/lib/utils";

type AvatarUrl = {
  imageUrl?: string;
  profileUrl?: string;
};

export function AvatarCircles({
  numPeople,
  avatarUrls = [],
  className,
}: {
  numPeople?: number;
  avatarUrls?: AvatarUrl[];
  className?: string;
}) {
  const circles = avatarUrls.length > 0 ? avatarUrls.slice(0, 6) : Array.from({ length: 6 }, () => ({}));

  return (
    <div className={cn("flex items-center", className)} aria-label={`${numPeople ?? 0} pessoas conectadas`}>
      {circles.map((avatar, index) => {
        const circle = (
          <span
            className="-ml-1.5 flex size-5 items-center justify-center overflow-hidden rounded-full border border-[#121312]/35 bg-white first:ml-0"
            style={{ zIndex: circles.length - index }}
          >
            {avatar.imageUrl ? (
              <img src={avatar.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <span className="size-2.5 rounded-full bg-[#121312]/[0.08]" />
            )}
          </span>
        );

        return avatar.profileUrl ? (
          <a key={`${avatar.profileUrl}-${index}`} href={avatar.profileUrl} aria-label="Ver perfil">
            {circle}
          </a>
        ) : (
          <span key={index}>{circle}</span>
        );
      })}
      {typeof numPeople === "number" && (
        <span className="-ml-1.5 flex size-5 items-center justify-center rounded-full border border-[#121312]/35 bg-white text-[7px] text-[#121312]">
          {numPeople > 99 ? "99+" : numPeople}
        </span>
      )}
    </div>
  );
}
