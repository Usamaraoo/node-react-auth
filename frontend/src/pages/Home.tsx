import { FC } from "react";
import { Link } from "react-router-dom";
import Widget from "../component/Widget";
const Home: FC = () => {
  return (
    <div>
      <h1 className="text-3xl text-center py-8 fpnt-bold">Home</h1>
      <div className="flex flex-wrap justify-center">
        <Widget
          title="Sales Summary"
          bgColor="bg-blue-500"
          textColor="text-white"
        >
          {/* Your sales summary content */}
          <p>Sales: $10,000</p>
          <p>Profit: $5,000</p>
        </Widget>
        <Widget
          title="Recent Orders"
          bgColor="bg-red-700"
          textColor="text-white"
        >
          {/* Your recent orders content */}
          <ul>
            <li>Order #123</li>
            <li>Order #124</li>
            <li>Order #125</li>
            {/* Add more recent orders */}
          </ul>
        </Widget>
        <Widget
          title="User Analytics"
          bgColor="bg-purple-500"
          textColor="text-white"
        >
          {/* Your user analytics content */}
          <p>Users: 1000</p>
          <p>Active Users: 500</p>
        </Widget>
      </div>
    </div>
  );
};

export default Home;
