import { useEffect, useState } from 'react';
import '../scss/components/profilepage/ProfilePage.scss';
import profilePlaceholder from '../assets/images/placeholder-profile.jpeg';
import { Link } from "react-router-dom";
import axios from "../axios/axios";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { isLogin, userInfo } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState('구매');
  const [filter, setFilter] = useState('전체');
  const [profileInfo, setProfileInfo] = useState(userInfo || null);
  const [purchaseData, setPurchaseData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLogin) return;

    const fetchProfileData = async () => {
      setIsLoading(true);
      try {

        const profileResponse = await axios.get('/user/my-page');
        setProfileInfo(profileResponse.data);


        // if (activeTab === '구매') {
        //   const purchaseResponse = await axios.get('/user/my-page/bought');
        //   setPurchaseData(purchaseResponse.data || []);
        // } else {
        //   const salesResponse = await axios.get('/user/my-page/sold');
        //   setSalesData(salesResponse.data || []);
        // }
      } catch (error) {
        console.error('데이터를 가져오는 데 실패했습니다:', error);
        setError('데이터를 가져오는 데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [activeTab, filter]);

  const cancelBid = async (bidId) => {
    try {
      await axios.post('/user/my-page/bid/cancel', { bidId });
      alert('입찰이 취소되었습니다.');
      setPurchaseData(purchaseData.filter((item) => item.id !== bidId));
    } catch (error) {
      console.error('입찰 취소 실패:', error);
      alert('입찰 취소에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const cancelTransaction = async (transactionId) => {
    try {
      await axios.post('/user/my-page/transaction/cancel', { transactionId });
      alert('낙찰이 취소되었습니다.');
      setSalesData(salesData.filter((item) => item.id !== transactionId));
    } catch (error) {
      console.error('낙찰 취소 실패:', error);
      alert('낙찰 취소에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilter('전체');
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = activeTab === '구매' ? purchaseData : salesData;

  if (isLoading) {
    return <p className="loading">로딩 중...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-info">
        <img src={profileInfo?.image || profilePlaceholder} alt="profile" className="profile-image" />
        <h2 className="nickname">{profileInfo?.nickname}</h2>
        <button className="edit-button"><Link to="/profile/edit">개인정보 수정</Link></button>
      </div>

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
        <div className="filter">
          <select value={filter} onChange={handleFilterChange}>
            <option value="전체">전체</option>
            <option value="입찰중">입찰중</option>
            <option value="낙찰">낙찰</option>
            <option value="거래완료">거래완료</option>
          </select>
        </div>

        <div className="list">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="list-item">
                <img src={item.image || profilePlaceholder} alt="item" className="item-image" />
                <div className="item-info">
                  <p>{item.title}</p>
                  <p>가격: {item.price}</p>
                  <p>상태: {item.status}</p>
                </div>
                {activeTab === '구매' && item.status === '입찰중' && (
                  <button
                    onClick={() => cancelBid(item.id)}
                    className="cancel-button"
                  >
                    입찰 취소
                  </button>
                )}
                {activeTab === '판매' && item.status === '낙찰' && (
                  <button
                    onClick={() => cancelTransaction(item.id)}
                    className="cancel-button"
                  >
                    낙찰 취소
                  </button>
                )}
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
