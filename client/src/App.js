import React from 'react';
import clsx from 'clsx';
import { Document, Page } from 'react-pdf';

import ProjectItem from './components/ProjectItem';
import resumePDF from './resources/Resume.pdf';
import './App.css';

/* 
    The source code for my website portfolio hosted on https://nathanraymant.com
*/

class App extends React.Component {
    /* The master/primary app code */

    state = {
        projects_left: true, // Indicates whether the view selector is on the left side (over the 'Projects' btn)
        transition_ready: true // True when the view select indicator is not currently in an animation
    };

    renderProjects = () => {
        /*  Renders the project items/cards using the ProjectItem React component.
            The content of the cards is passed through to the component code as properties.
        */
        return (<>
            {/* The required props are: <title=str> <description=str> <aLinkURL=str> <aLinkText=str> */}
            <ProjectItem title="SimpleScripter"
                            description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                        Sed justo nibh, ultricies et elementum a, elementum.`}
                            aLinkURL=""
                            aLinkText="View the demo"/>
            <ProjectItem title="QuizEra"
                            description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                        Sed justo nibh, ultricies et elementum a, elementum.`}
                            aLinkURL=""
                            aLinkText="View the demo"/>
            <ProjectItem title="Breakfast Club"
                            description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                        Sed justo nibh, ultricies et elementum a, elementum.`}
                            aLinkURL=""
                            aLinkText="View the demo"/>
            <ProjectItem title="Event Scheduler CLI"
                            description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                        Sed justo nibh, ultricies et elementum a, elementum.`}
                            aLinkURL=""
                            aLinkText="View the demo"/>
            <ProjectItem title="This Portfolio Site"
                            description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                        Sed justo nibh, ultricies et elementum a, elementum.`}
                            aLinkURL=""
                            aLinkText="View source code"/>
        </>);
    }

    renderViewButtons = () => {
        /*  Renders the view select buttons (i.e., the 'Projects' and 'Résumé' buttons).
            Animations are controlled by conditionally adding CSS classes using the 'clsx' module and states.
        */
        return (<>
            <div className="viewButtons">
                <button className="projectsBtn btnStyle"
                onClick={() => {
                    if (!this.state.projects_left && this.state.transition_ready) {
                        // play animation RtoL
                        this.setState({projects_left: true});
                    }
                }}><div className={clsx({blackText: true, blackTextHoverable: !this.state.projects_left})}>
                    <div className="blackTextText">Projects</div></div>
                </button>
                <div className={clsx({viewIndicatorRtoL: this.state.projects_left, 
                    viewIndicatorLtoR: !this.state.projects_left, viewIndicator: true})}></div>
                <button className="resumeBtn btnStyle"
                onClick={() => {
                    if (this.state.projects_left && this.state.transition_ready) {
                        // play animation LtoR
                        this.setState({projects_left: false});
                    }
                }}><div className={clsx({blackText: true, blackTextHoverable: this.state.projects_left})}>
                    <div className="blackTextText">R&eacute;sum&eacute;</div></div>
                </button>
            </div>
        </>);
    }

    removeTextLayerOffset = () => {
        // Fixes the terrible text-highlighting offset for the résumé PDF.
        // Solution taken from react-pdf 'issues' page: 
        // https://github.com/wojtekmaj/react-pdf/issues/332#issuecomment-458121654

        const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
          textLayers.forEach(layer => {
            const { style } = layer;
            style.top = "0";
            style.left = "0";
            style.transform = "";
        });
      }

    renderSelectedView = () => {
        // Renders the appropriate view depending on the state of 'projects_left'

        return (<>
            <div className={clsx({projects: true, projectsLtoC: this.state.projects_left, projectsCtoL: !this.state.projects_left})}>
                {this.renderProjects()}
            </div>
            <div className={clsx({resume: true, resumeRtoC: !this.state.projects_left, resumeCtoR: this.state.projects_left})}>
                 {/* Rendering PDF file using 'react-pdf' npm module */}
                 <Document file={resumePDF}>
                     <Page pageNumber={1} onLoadSuccess={this.removeTextLayerOffset}/>
                 </Document>
                 <a className="pdfDownload" href="./Resume.pdf" download><img src="pdfDownload.png"></img></a>
             </div>
        </>);
    }

    render() {
        // The main render function

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
                {this.renderSelectedView()}
            </div>
        </>);
    }
}

export default App;
