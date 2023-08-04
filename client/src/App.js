import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from './Dashboard';
import Sayyara from './views/SayyaraDemo';
import SimpleScripter from './views/SimpleScripterDemo';
import BreakfastClub from './views/BreakfastClubDemo';
import EventSchedulerCLI from './views/EventSchedulerCLIDemo';

/* 
    The source code for my website portfolio hosted on https://nathanraymant.com
*/

function App() {
    // The main router for the site - contains routes to all views/pages

    return (
    <div>
        <Router>
            <Routes>
                {/* The default route which leads to the dashboard/main page */}
                <Route exact path='/' element={<Dashboard/>}/>
                <Route exact path='/SimpleScripter' element={<SimpleScripter/>}/>
                <Route exact path='/BreakfastClub' element={<BreakfastClub/>}/>
                <Route exact path='/EventSchedulerCLI' element={<EventSchedulerCLI/>}/>
                <Route exact path='/SayyaraDemo' element={<Sayyara/>}/>
            </Routes>
        </Router>
    </div>
    );
}
export default App;