import { Suspense } from "react";
import Fallback from "../../assets/Fallback";
import Content from "../../components/Content/Content";
import "./MainPage.css";

const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <h1>CO₂ Emissions Dashboard</h1>
      <Suspense fallback={<Fallback />}>
        <Content />
      </Suspense>
    </div>
  );
};

export default MainPage;
