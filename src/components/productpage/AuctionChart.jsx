import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AuctionChart = () => {
  const today = new Date();
  const dateString = today.toLocaleDateString();

  const mockData = [
    { date: dateString, price: 100 },
    { date: dateString, price: 3000 },
    { date: dateString, price: 2000 },
    { date: dateString, price: 2780 },
    { date: dateString, price: 1890 },
    { date: dateString, price: 500000 },
  ];

  return (
    <div>
      <BarChart
        width={600}
        height={300}
        data={mockData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis scale="log" domain={[1, 'dataMax']} />
        <Tooltip />
        <Bar dataKey="price" fill="#8884d8" />
      </BarChart>
      <button>입찰</button>
    </div>
  );
};

export default AuctionChart;
