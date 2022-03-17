import Header from './components/Header';
import Info from './components/Info';
import './scss/style.scss';

function App() {
  const path = process.env.PUBLIC_URL;
  return (
    <div className="App">
      <div className="dining">
        <img src={`${path}/image/bg.jpg`} alt="지도 이미지" />
        <Header />
        <Info />
      </div>

    </div>
  );
}

export default App;
