
import './App.css';
import Calendar from './components/Calendar/Calendar'
import SettingsContext from "./components/Contexts";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

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
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Calendar</Link>
                        </li>
                        <li>
                            <Link to='/table'>Table</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Switch>
                <Route path='/table'>
                    <h1>table goes here</h1>
                </Route>
                <Route path='/'>
                    <SettingsContext.Provider value={settingsValue}>
                        <Calendar/>
                    </SettingsContext.Provider>
                </Route>
            </Switch>
        </Router>


    </div>
  );
}

export default App;
