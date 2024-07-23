import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GetQuestions } from '../components/GetQuestions/GetQuestions';
import { HomePage } from '../components/HomePage/HomePage';
import App from '../App';
import { NullifyTest } from '../components/NullifyTest/NullifyTest';

export const Router = () => {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/questions" exact element={<GetQuestions />} />
          <Route path="/nullify" exact element={<NullifyTest />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
};
