import {useState} from 'react';
import '../../scss/components/profilepage/ProfileEdit.scss';
import profilePlaceholder from '../../assets/images/placeholder-profile.jpeg';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    email: '', nickname: '', password: '', confirmPassword: '', phoneNumber: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData, [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 수정 로직 추가 (서버로 데이터 전송 등)
    alert('정보가 수정되었습니다.');
  };

  const handleDeleteAccount = () => {
    // 회원 탈퇴 로직 추가
    alert('회원탈퇴가 완료되었습니다.');
  };

  return (
    <div className="profile-edit-page">
      <h1 className="title">개인정보 수정</h1>
      <div className="profile-section">
        <img
          src={profilePlaceholder}
          alt="profile"
          className="profile-image"
        />
        <button className="change-photo-button">사진변경</button>
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
          <button type="submit" className="edit-button">수정하기</button>
          <button
            type="button"
            className="delete-button"
            onClick={handleDeleteAccount}
          >
            회원탈퇴
          </button>
        </div>
      </form>
    </div>);
};

export default ProfileEdit;
