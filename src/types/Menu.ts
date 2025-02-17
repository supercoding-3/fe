export interface MenuItem {
  label: string;
  path: string;
  isLink: boolean;
  onClick?: () => void;
}
