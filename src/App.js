import './App.css';
import Homepage from './pages/homepage';

// import {SkeletonTheme} from 'react-loading-skeleton';

const App = () => {
  return (
    // <SkeletonTheme baseColor='#ddd' highlightColor='#bbb'>
    <div className="App">
      <Homepage />
    </div>
    // </SkeletonTheme>
  );
}

export default App;
