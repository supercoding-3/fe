export type FileData = string | ArrayBuffer | null;

export interface FieldData {
  id: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'file';
  required?: boolean;
}

export interface FormInputProps {
  label: string;
  fieldData: FieldData;
  regex?: RegExp;
  helpText?: string;
  onFileChange?: (base64: FileData) => void;
}
