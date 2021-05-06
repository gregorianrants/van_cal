import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar'
import SettingsContext from "./components/Contexts";

const settingsValue =
{
    borderWidth: 1,
    hourHeight: 30
}

//TODO will need to read through code at some point and chekc the math, not sure i am accounting for border width when looking
//at height of each hour/day
//also need to think about the implciations of the fact that a pixel values in css can be rounded may need to put in some code to account for
//border width being set by a user to something that gets rounded

function App() {

    return (
    <div className="App">
        <SettingsContext.Provider value={settingsValue}>
            <Calendar/>
        </SettingsContext.Provider>
    </div>
  );
}

export default App;
