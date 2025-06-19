export interface Password {
  id: string;
  website: string;
  username: string;
  password: string; // encrypted
  createdAt: string;
  updatedAt: string;
}
export interface PasswordFormProps {
  password?: Password; // Optional for new password creation
  onSave: (password: Password) => void;
  onCancel: () => void;
}