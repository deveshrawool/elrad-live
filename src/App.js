import logo from './logo.svg';
import './App.css';
import PartA from 'components/partA/PartA';
import PartB from 'components/partB/PartB';
import PartC from 'components/partC/PartC';

function App() {
  return (
    <div className="App">
      <div>{`<  Bio`}</div>
      <PartA />
      <PartB />
      <PartC />
    </div>
  );
}

export default App;
