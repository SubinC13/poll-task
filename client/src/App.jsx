import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePoll from './pages/CreatePoll.jsx';
import ViewPoll from './pages/ViewPoll.jsx';
import AllPolls from './pages/AllPolls.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatePoll />} />
        <Route path="/polls" element={<AllPolls />} />
        <Route path="/poll/:id" element={<ViewPoll />} />
      </Routes>
    </Router>
  );
}

export default App;

