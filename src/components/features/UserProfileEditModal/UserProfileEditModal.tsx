import { useEffect, useState } from 'react';
import './user-profile-edit-modal.scss';
import { Modal, Input, Button, FormError } from '@/components/ui';
import { AUTH_FORM_PROFILE_EDIT } from '@/constants/authForm';
import { userApi } from '@/api';
import { User, ProfileEditForm } from '@/types';

const UserProfileEditModal = ({
  show,
  setShow,
  prevUserInfo,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  prevUserInfo: User;
}) => {
  const [formValues, setFormValues] = useState<ProfileEditForm>(
    {} as ProfileEditForm
  );
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      return setErrorMessage('비밀번호 재확인 값이 다릅니다');
    }

    try {
      await userApi.edit(formValues);
      window.location.reload();
    } catch (error) {
      setErrorMessage('프로필 수정 중에 오류가 발생했습니다');
    }
  };

  useEffect(() => {
    if (!show) {
      setFormValues({} as ProfileEditForm);
      setErrorMessage('');
    }
  }, [show]);

  return (
    <Modal show={show} setShow={setShow}>
      <p className="form-title">프로필 수정</p>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__field-container">
          {AUTH_FORM_PROFILE_EDIT.map((field) => {
            return (
              <label key={field.id} htmlFor={field.id} className="form__label">
                {field.label}
                <Input
                  id={field.id}
                  type={field.type}
                  value={formValues[field.id as keyof ProfileEditForm]}
                  onChange={handleInputChange}
                  placeholder={
                    prevUserInfo[field.prevValId as keyof User] || '********'
                  }
                />
              </label>
            );
          })}
        </div>
        <FormError>{errorMessage}</FormError>
        <Button>수정</Button>
      </form>
    </Modal>
  );
};

export default UserProfileEditModal;
