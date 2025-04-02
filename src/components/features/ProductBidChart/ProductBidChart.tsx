import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import './product-bid-chart.scss';
import { Error } from '@/components/pages';
import { EmptyState } from '@/components/ui';
import { Bid } from '@/types';

const ProductBidChart = ({ allBids }: { allBids: Bid[] }) => {
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    const extractBidDetails = (bids: Bid[]) => {
      if (!bids) return [];

      return bids.map(({ bidCreatedAt, bidPrice }) => {
        const bidDate = bidCreatedAt.slice(0, 10);
        return {
          bidCreatedAt: bidDate,
          bidPrice,
        };
      });
    };

    const bids = extractBidDetails(allBids) as Bid[];

    setBids(bids);
  }, [allBids]);

  if (!allBids) {
    return <Error errorMessage="입찰 정보를 찾을 수 없습니다" />;
  }

  if (bids.length === 0) {
    return <EmptyState message="입찰 정보가 없습니다" />;
  }

  return (
    <div className="product-bid-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={bids}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bidCreatedAt" type="category" />
          <YAxis
            scale="log"
            domain={[1, 'dataMax']}
            label={{ value: '입찰가', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip formatter={(value) => [`${value}원`, '입찰가']} />
          <Bar
            dataKey="bidPrice"
            fill="#333"
            radius={[20, 20, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductBidChart;
