export type ConfirmOptions = {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
};

export type ConfirmState = ConfirmOptions & {
  open: boolean;
};

export type ConfirmContextValue = {
  state: ConfirmState | null;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  resolve: (value: boolean) => void;
};
