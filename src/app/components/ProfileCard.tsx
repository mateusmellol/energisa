import { LucideIcon } from "lucide-react";

interface ProfileCardProps {
  icon: LucideIcon;
  label: string;
}

export function ProfileCard({ icon: Icon, label }: ProfileCardProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0">
        <Icon size={24} strokeWidth={1.5} color="currentColor" />
      </div>
      <p style={{ 
        fontFamily: "Sora, sans-serif", 
        fontSize: "15px", 
        color: "inherit",
        fontWeight: 400
      }}>
        {label}
      </p>
    </div>
  );
}
