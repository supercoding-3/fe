import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import './my-page.scss';
import { Error } from '@/components/pages';
import { EmptyState, Tab } from '@/components/ui';
import { UserProfile, ProductDetailCard } from '@/components/features';
import { userApi } from '@/api';
import { MyPageProduct } from '@/types';
import { MY_PAGE_TAB } from '@/constants/myPageTab';
import spinner from '@/assets/images/spinner.svg';

const MyPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<MyPageProduct>({} as MyPageProduct);
  const [activeTab, setActiveTab] = useState<string>(MY_PAGE_TAB[0].id);

  const { user } = useSelector((state: RootState) => state.user);

  const getUserProducts = async () => {
    try {
      const response = await userApi.getProducts();
      setProducts(response);
    } catch (error) {
      setError('상품 데이터를 가져오는 중에 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setError('사용자 정보를 찾는 중에 오류가 발생했습니다');
    } else {
      getUserProducts();
    }
  }, []);

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <div className="my-page">
      <UserProfile user={user} />
      <section className="my-page__content">
        <Tab
          tabMenu={MY_PAGE_TAB}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          {loading ? (
            <img src={spinner} alt="spinner" />
          ) : products[activeTab as keyof MyPageProduct].length > 0 ? (
            products[activeTab as keyof MyPageProduct].map((product) => (
              <ProductDetailCard key={product.productId} product={product} />
            ))
          ) : (
            <EmptyState message="상품 목록이 비어있습니다" />
          )}
        </Tab>
      </section>
    </div>
  );
};

export default MyPage;
