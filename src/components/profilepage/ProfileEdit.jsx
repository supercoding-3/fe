import {useState} from 'react';
import '../../scss/components/profilepage/ProfileEdit.scss';
import profilePlaceholder from '../../assets/images/placeholder-profile.jpeg';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    email: '', nickname: '', password: '', confirmPassword: '', phoneNumber: '',
  });
  // const [profileImage, setProfileImage] = useState(profilePlaceholder); // 현재 프로필 이미지 상태
  // const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일 상태

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData, [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('정보가 수정되었습니다.');
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //
  //   // 유효성 검사
  //   if (formData.password !== formData.confirmPassword) {
  //     alert('비밀번호가 일치하지 않습니다.');
  //     return;
  //   }
  //
  //   try {
  //     const response = await axios.put(`/api/user/my-page/edit/${userId}`, formData);
  //     if (response.status === 200) {
  //       alert('회원정보가 성공적으로 수정되었습니다.');
  //     } else {
  //       alert('회원정보 수정에 실패했습니다.');
  //     }
  //   } catch (error) {
  //     console.error('회원정보 수정 중 에러 발생:', error);
  //     alert('회원정보 수정 중 문제가 발생했습니다.');
  //   }
  // };

  const handleDeleteAccount = () => {
    alert('회원탈퇴가 완료되었습니다.');
  };
  // const handleDeleteAccount = async () => {
  //   const confirmDelete = window.confirm('정말로 회원탈퇴를 진행하시겠습니까?');
  //   if (!confirmDelete) return;
  //
  //   try {
  //     const response = await axios.patch('/api/user/deactivate', { userId }); // API 호출
  //     if (response.status === 200) {
  //       alert('회원탈퇴가 완료되었습니다.');
  //       navigate('/'); // 메인 페이지로 리디렉션
  //     } else {
  //       alert('회원탈퇴에 실패했습니다.');
  //     }
  //   } catch (error) {
  //     console.error('회원탈퇴 중 에러 발생:', error);
  //     alert('회원탈퇴 중 문제가 발생했습니다.');
  //   }
  // };


  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedFile(file); // 선택된 파일 상태 업데이트
  //     setProfileImage(URL.createObjectURL(file)); // 미리보기 이미지 업데이트
  //   }
  // };
  //
  // const handlePhotoUpload = async () => {
  //   if (!selectedFile) {
  //     alert('파일을 선택해주세요.');
  //     return;
  //   }
  //
  //   const formData = new FormData();
  //   formData.append('profileImage', selectedFile);
  //
  //   try {
  //     const response = await axios.post('/api/user/my-page/edit/2/profile', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //
  //     if (response.status === 200) {
  //       alert('사진이 성공적으로 변경되었습니다.');
  //     } else {
  //       alert('사진 변경에 실패했습니다.');
  //     }
  //   } catch (error) {
  //     console.error('사진 업로드 중 에러 발생:', error);
  //     alert('사진 변경 중 문제가 발생했습니다.');
  //   }
  // };


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
