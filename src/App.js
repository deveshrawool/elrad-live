import logo from './logo.svg';
import './App.css';
import PartA from 'components/partA/PartA';
import PartB from 'components/partB/PartB';

function App() {
  return (
    <div className="App">
      <div>{`Bio`}</div>
      <PartA />
      <PartB />
    </div>
  );
}

export default App;
