import './assets/css/theme.css';
import {TikTakView} from "./views/TikTakView";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePageView from "./views/HomePageView/HomePageView";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <div className="h-full overflow-hidden">
      <BrowserRouter>
          <Routes>
              <Route
                  path="/"
                  element={<HomePageView />}
              />
              <Route
                  path="/game-room"
                  element={<TikTakView />}
              />
          </Routes>
      </BrowserRouter>
      <ToastContainer hideProgressBar position='bottom-right'/>
    </div>
  );
}

export default App;
