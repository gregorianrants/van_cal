import logo from './logo.svg';
import './App.css';
import Week from './components/Week'
import SettingsContext from "./components/Contexts";

const settingsValue =
{
    borderWidth: 1,
    hourHeight: 20
}



function App() {

    return (
    <div className="App">
        <SettingsContext.Provider value={settingsValue}>
            <Week/>
        </SettingsContext.Provider>
    </div>
  );
}

export default App;
