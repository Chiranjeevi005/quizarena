import { IconName } from "@/icons/IconRegistry";

export interface ToolbarActionProps {
  id?: string;
  icon?: IconName;
  label?: string;
  active?: boolean;
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;
  badge?: string | number;
  counter?: number;
  favorite?: boolean;
  danger?: boolean;
  onClick?: () => void;
  className?: string;
}
