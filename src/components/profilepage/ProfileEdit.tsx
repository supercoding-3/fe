import { useState, ChangeEvent, FormEvent } from 'react';
import '../../scss/components/profilepage/ProfileEdit.scss';
import profilePlaceholder from '../../assets/images/placeholder-profile.jpeg';
import axios from '../../axios/axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface UserState {
  isLogin: boolean;
}

interface FormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

const ProfileEdit: React.FC = () => {
  const navigate = useNavigate();

  const { isLogin } = useSelector((state: { user: UserState }) => state.user);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const [profileImage, setProfileImage] = useState<string>(profilePlaceholder);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) {
      alert('파일을 선택해주세요.');
      return;
    }

    const data = new FormData();
    data.append('profileImage', selectedFile);

    try {
      const response = await axios.post('/user/my-page/edit/profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('사진이 성공적으로 변경되었습니다.');
      } else {
        alert('사진 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('사진 업로드 중 에러 발생:', error);
      alert('사진 변경 중 문제가 발생했습니다.');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.patch(
        '/user/my-page/edit/profile',
        formData
      );
      if (response.status === 200) {
        alert('회원정보가 성공적으로 수정되었습니다.');
      } else {
        alert('회원정보 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원정보 수정 중 에러 발생:', error);
      alert('회원정보 수정 중 문제가 발생했습니다.');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('정말로 회원탈퇴를 진행하시겠습니까?');
    if (!confirmDelete) return;

    if (!isLogin) {
      alert('로그인 상태가 아닙니다.');
      return;
    }

    const requestBody = {
      userEmail: formData.email,
      userPassword: formData.password,
      userNickname: formData.nickname,
      userPhone: formData.phoneNumber,
      userIsDeleted: true,
    };

    try {
      const response = await axios.patch('/user/deactivate', requestBody);
      if (response.status === 200) {
        alert('회원탈퇴가 완료되었습니다.');
        navigate('/');
      } else {
        alert('회원탈퇴에 실패했습니다.');
      }
    } catch (error: any) {
      console.error(
        '회원탈퇴 중 에러 발생:',
        error.response?.data || error.message
      );
      alert('회원탈퇴 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className="profile-edit-page">
      <h1 className="title">개인정보 수정</h1>
      <div className="profile-section">
        <img src={profileImage} alt="profile" className="profile-image" />
        <input
          type="file"
          accept="image/*"
          className="file-input"
          onChange={handleFileChange}
        />
        <button className="change-photo-button" onClick={handlePhotoUpload}>
          사진변경
        </button>
      </div>

      <form className="info-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="입력창"
          />
        </div>

        <div className="form-group">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="입력창"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="입력창"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="입력창"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">전화번호</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="입력창"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="edit-button">
            수정하기
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={handleDeleteAccount}
          >
            회원탈퇴
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
