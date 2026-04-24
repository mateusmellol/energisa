import { LucideIcon } from "lucide-react";

interface ProfileCardProps {
  icon: LucideIcon;
  label: string;
}

export function ProfileCard({ icon: Icon, label }: ProfileCardProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0">
        <Icon size={24} strokeWidth={1.5} color="#121312" />
      </div>
      <p style={{ 
        fontFamily: "Sora, sans-serif", 
        fontSize: "15px", 
        color: "#121312",
        fontWeight: 400
      }}>
        {label}
      </p>
    </div>
  );
}
