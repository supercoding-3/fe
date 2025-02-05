import { useState } from 'react';
import { FileData, FormInputProps } from 'types/FieldData';
import formatPhoneNumber from '../../utils/formatPhoneNumber';

const FormInput: React.FC<FormInputProps> = ({
  label,
  fieldData,
  regex,
  helpText,
  onFileChange,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [imageBase64, setImageBase64] = useState<FileData>(null);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    if (fieldData.type === 'tel') {
      value = formatPhoneNumber(value);
      e.target.value = value;
    }

    if (fieldData.type === 'file' && e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageBase64(reader.result);
          if (onFileChange) onFileChange(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }

    if (regex) {
      setIsValid(regex.test(value));
    }
  };

  return (
    <div>
      <label>{label}</label>
      <input
        id={fieldData.id}
        name={fieldData.id}
        type={fieldData.type}
        required={fieldData.required}
        onChange={handleInputValue}
        autoComplete="off"
      />
      {fieldData.type === 'file' && imageBase64 && (
        <div>
          <p>파일이 선택되었습니다.</p>
          <img
            src={imageBase64}
            alt="Selected"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        </div>
      )}
      {!isValid && <p>{helpText}</p>}
    </div>
  );
};

export default FormInput;
