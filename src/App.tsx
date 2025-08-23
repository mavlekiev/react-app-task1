import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
