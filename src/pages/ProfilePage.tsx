import { useEffect, useState, ChangeEvent } from 'react';
import '../scss/components/profilepage/ProfilePage.scss';
import profilePlaceholder from '../assets/images/placeholder-profile.jpeg';
import { Link } from "react-router-dom";
import axios from "../axios/axios";
import { useSelector } from "react-redux";

// Redux 상태 타입 정의
interface UserState {
    isLogin: boolean;
    userInfo?: {
        image?: string;
        nickname: string;
    };
}

// 상품 데이터 타입 정의
interface ItemData {
    id: string | number;
    image?: string;
    title: string;
    price: string | number;
    status: string;
}

const ProfilePage: React.FC = () => {
    const { isLogin, userInfo } = useSelector((state: { user: UserState }) => state.user);

    const [activeTab, setActiveTab] = useState<string>('구매');
    const [filter, setFilter] = useState<string>('전체');
    const [profileInfo, setProfileInfo] = useState<UserState['userInfo'] | null>(userInfo || null);
    const [purchaseData, setPurchaseData] = useState<ItemData[]>([]);
    const [salesData, setSalesData] = useState<ItemData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isLogin) return;

        const fetchProfileData = async () => {
            setIsLoading(true);
            try {
                const profileResponse = await axios.get('/user/my-page');
                setProfileInfo(profileResponse.data);
            } catch (error) {
                console.error('데이터를 가져오는 데 실패했습니다:', error);
                setError('데이터를 가져오는 데 실패했습니다. 다시 시도해주세요.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, [activeTab, filter, isLogin]);

    // 입찰 취소 함수
    const cancelBid = async (bidId: string | number) => {
        try {
            await axios.post('/user/my-page/bid/cancel', { bidId });
            alert('입찰이 취소되었습니다.');
            setPurchaseData((prev) => prev.filter((item) => item.id !== bidId));
        } catch (error) {
            console.error('입찰 취소 실패:', error);
            alert('입찰 취소에 실패했습니다. 다시 시도해주세요.');
        }
    };

    // 낙찰 취소 함수
    const cancelTransaction = async (transactionId: string | number) => {
        try {
            await axios.post('/user/my-page/transaction/cancel', { transactionId });
            alert('낙찰이 취소되었습니다.');
            setSalesData((prev) => prev.filter((item) => item.id !== transactionId));
        } catch (error) {
            console.error('낙찰 취소 실패:', error);
            alert('낙찰 취소에 실패했습니다. 다시 시도해주세요.');
        }
    };

    // 탭 변경 핸들러
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setFilter('전체');
    };

    // 필터 변경 핸들러
    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    };

    // 선택된 데이터 필터링
    const filteredData: ItemData[] = activeTab === '구매' ? purchaseData : salesData;

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
                <button className="edit-button">
                    <Link to="/profile/edit">개인정보 수정</Link>
                </button>
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
