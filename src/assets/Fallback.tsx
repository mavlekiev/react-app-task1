import "./Fallback.css";

const Fallback: React.FC = () => {
  return (
    <div className="fallback">
      <h2>Загрузка данных CO₂...</h2>
      <p>Файл ~100 МБ — может занять 10–30 секунд</p>
      <div className="spinner"></div>
    </div>
  );
};

export default Fallback;
