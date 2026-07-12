import React from "react";
export const DangerZone: React.FC<{ className?: string }> = ({ className = "" }) => {
  return <div className={`${className}`}>DangerZone</div>;
};
