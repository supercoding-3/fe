import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useEffect, useState } from 'react';
import '@/scss/components/productpage/AuctionChart.scss';
import { Bid } from '@/types/Product';

const AuctionChart = ({ allBids }: { allBids: Bid[] }) => {
  const [bids, setBids] = useState<Bid[]>([]);

  const extractBidDetails = (bids: Bid[]) => {
    return bids.map(({ bidCreatedAt, bidPrice }) => {
      const bidDate = bidCreatedAt.slice(0, 10);
      return {
        bidCreatedAt: bidDate,
        bidPrice,
      };
    });
  };

  useEffect(() => {
    const bids = extractBidDetails(allBids) as Bid[];
    setBids(bids);
  }, [allBids]);

  if (!allBids) {
    return <div>입찰 정보를 불러올 수 없습니다</div>;
  }

  if (bids.length === 0) {
    return (
      <div className="help-text">
        <p className="help-text--no-data">입찰 정보가 없습니다</p>
      </div>
    );
  }

  return (
    <BarChart width={650} height={300} data={bids}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="bidCreatedAt" type="category" />
      <YAxis scale="log" domain={[1, 'dataMax']} />
      <Tooltip />
      <Bar
        dataKey="bidPrice"
        fill="#333"
        radius={[20, 20, 0, 0]}
        barSize={20}
      />
    </BarChart>
  );
};

export default AuctionChart;
