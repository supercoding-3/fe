import {useState} from 'react';
import '../scss/components/profilepage/ProfilePage.scss';
import profilePlaceholder from '../assets/images/placeholder-profile.jpeg';
import {Link} from "react-router-dom";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('구매'); // 현재 탭 상태 ('구매' 또는 '판매')
  const [filter, setFilter] = useState('전체'); // 필터 상태 ('전체', '입찰중', ...)

  // 임의의 데이터 (구매 및 판매 데이터)
  const purchaseData = [
    {id: 1, title: '카메라', price: 30000, status: '입찰중'},
    {id: 2, title: '노트북', price: 50000, status: '거래중'},
  ];

  const salesData = [
    {id: 1, title: '헤드폰', price: 15000, status: '취소'},
    {id: 2, title: '스마트폰', price: 25000, status: '거래완료'},
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilter('전체'); // 탭 변경 시 필터를 초기화
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // 현재 탭(구매/판매)과 필터 상태에 따라 데이터를 필터링
  const filteredData =
    activeTab === '구매'
      ? purchaseData.filter((item) => filter === '전체' || item.status === filter)
      : salesData.filter((item) => filter === '전체' || item.status === filter);

  return (
    <div className="profile-page">
      {/* 상단 프로필 섹션 */}
      <div className="profile-info">
        <img src={profilePlaceholder} alt="profile" className="profile-image"/>
        <h2 className="nickname">닉네임</h2>
        <button className="edit-button"><Link to="/edit">개인정보 수정</Link></button>
      </div>

      {/* 구매/판매 섹션 */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === '구매' ? 'active' : ''}`}
          onClick={() => handleTabChange('구매')}
        >
          구매
        </button>
        <button
          className={`tab ${activeTab === '판매' ? 'active' : ''}`}
          onClick={() => handleTabChange('판매')}
        >
          판매
        </button>
      </div>

      <div className="content">
        {/* 필터 드롭다운 */}
        <div className="filter">
          <select value={filter} onChange={handleFilterChange}>
            <option value="전체">전체</option>
            <option value="입찰중">입찰중</option>
            <option value="거래중">거래중</option>
            <option value="거래완료">거래완료</option>
          </select>
        </div>

        {/* 구매/판매 리스트 */}
        <div className="list">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="list-item">
                <img src={profilePlaceholder} alt="item" className="item-image"/>
                <div className="item-info">
                  <p>{item.title}</p>
                  <p>입찰액: {item.price.toLocaleString()}원</p>
                  <p>상태: {item.status}</p>
                </div>
                <button className="action-button">입찰취소</button>
              </div>
            ))
          ) : (
            <p className="no-data">데이터가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
