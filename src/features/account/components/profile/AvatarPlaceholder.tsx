import React from "react";
export const AvatarPlaceholder: React.FC<{ className?: string }> = ({ className = "" }) => {
  return <div className={`${className}`}>AvatarPlaceholder</div>;
};
