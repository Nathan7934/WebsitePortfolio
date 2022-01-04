import React from 'react';
import clsx from 'clsx';

import './App.css';

class App extends React.Component {

    state = {
        vs_left: true, // Indicates whether the view selector is on the left side (over the 'Projects' btn)
        transition_ready: true
    };

    renderViewButtons = () => {
        
        return (<>
            <div className="viewButtons">
                <button className="projectsBtn btnStyle"
                onClick={() => {
                    if (!this.state.vs_left && this.state.transition_ready) {
                        // play animation RtoL
                        this.setState({vs_left: true});
                    }
                }}><div className={clsx({blackText: true, blackTextHoverable: !this.state.vs_left})}>
                    Projects</div>
                </button>
                <div className={clsx({viewIndicatorRtoL: this.state.vs_left, 
                    viewIndicatorLtoR: !this.state.vs_left, viewIndicator: true})}></div>
                <button className="resumeBtn btnStyle"
                onClick={() => {
                    if (this.state.vs_left && this.state.transition_ready) {
                        // play animation LtoR
                        this.setState({vs_left: false});
                    }
                }}><div className={clsx({blackText: true, blackTextHoverable: this.state.vs_left})}>
                    R&eacute;sum&eacute;</div>
                </button>
            </div>
        </>);
    }

    render() {
        return (<>
            <div className="intro">
                <div className="introWelcome">Welcome<span className="welcomeComma">,</span></div>
                <div className="nameVeil"></div>
                <div className="introName">I'm Nathan Raymant</div>
            </div>
            <div className="content">
                <div className="aboutBio">
                    A Toronto based software developer and student.
                    <br/>
                    I make practical, user-oriented applications.
                </div>
                {this.renderViewButtons()}
                
            </div>
        </>);
    }
}

export default App;
