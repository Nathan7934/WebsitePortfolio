import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import SimpleScripter from './views/SimpleScripterDemo';
import BreakfastClub from './views/BreakfastClubDemo';
import EventSchedulerCLI from './views/EventSchedulerCLIDemo';

/* 
    The source code for my website portfolio hosted on https://nathanraymant.com
*/

function App() {
    // The main router for the site - contains routes to all views/pages

    return (
    <>
        <BrowserRouter>
            <Switch>

                {/* The default route which leads to the dashboard/main page */}
                <Route exact path='/' render={() => (
                    <Dashboard/>
                )}/>

                <Route exact path='/SimpleScripter' render={() => (
                    <SimpleScripter/>
                )}/>
                <Route exact path='/BreakfastClub' render={() => (
                    <BreakfastClub/>
                )}/>
                <Route exact path='/EventSchedulerCLI' render={() => (
                    <EventSchedulerCLI/>
                )}/>

            </Switch>
        </BrowserRouter>
    </>
    );
}
export default App;