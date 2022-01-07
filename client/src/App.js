import React from 'react';
import clsx from 'clsx';
import { Document, Page } from 'react-pdf';

import ProjectItem from './components/ProjectItem';
import resumePDF from './resources/Resume.pdf';
import './App.css';
import './AppCompact.css';

/* 
    The source code for my website portfolio hosted on https://nathanraymant.com
*/

class App extends React.Component {
    /* The master/primary app code */

    constructor(props) {
        super(props);
        this.state = {use_compact: window.innerWidth < 900 ? true : false, 
                      projects_left: true};
        this.updateViewWidth = this.updateViewWidth.bind(this);
    }
    // The below lifecycle functions are used to update the correct value 
    // for the view_width state. 'resize' event triggers the callback function
    componentWillMount() {
        this.updateViewWidth();
        window.addEventListener('resize', this.updateViewWidth);
    }
    componentWillUnmount() {
        this.removeEventListener('resize', this.updateViewWidth)
    }
    updateViewWidth() {
        this.setState({use_compact: window.innerWidth < 900 ? true : false});
        if (this.state.use_compact) { console.log("Compact mode enabled") }
        console.log("View width updated");
    }

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

    renderViewButtons = (use_compact, projects_left) => {
        /*  Renders the view select buttons (i.e., the 'Projects' and 'Résumé' buttons).
            Animations are controlled by conditionally adding CSS classes using the 'clsx' module and states.
        */
        return (<>
            <div className={clsx({viewButtons: !use_compact, viewButtons_C: use_compact})}>
                <button className={clsx({btnStyle: true, projectsBtn: !use_compact, projectsBtn_C: use_compact})}
                onClick={() => {
                    if (!this.state.projects_left) {
                        // play animation RtoL
                        this.setState({projects_left: true});
                    }
                }}><div className={clsx({blackText: true, blackTextHoverable: !projects_left})}>
                    <div className="blackTextText">Projects</div></div>
                </button>
                <div className={clsx({viewIndicator: true,
                                      viewIndicatorRtoL: projects_left && !use_compact, viewIndicatorRtoL_C: projects_left && use_compact, 
                                      viewIndicatorLtoR: !projects_left && !use_compact, viewIndicatorLtoR_C: !projects_left && use_compact})}>  
                </div>
                <button className={clsx({btnStyle: true, resumeBtn: !use_compact, resumeBtn_C: use_compact})}
                onClick={() => {
                    if (this.state.projects_left) {
                        // play animation LtoR
                        this.setState({projects_left: false});
                    }
                }}><div className={clsx({blackText: true, blackTextHoverable: projects_left})}>
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

    renderResume = (use_compact) => {
        if (use_compact) {
            return (<>
                <img src="resumeCompact.png"></img>
                <a className="pdfDownload_C" href="./Resume.pdf" download><img src="pdfDownload_C.png"></img></a>
            </>);
        }
        return (<>
            <Document file={resumePDF}>
                <Page pageNumber={1} onLoadSuccess={this.removeTextLayerOffset}
                      className={clsx({pdfPage_C: use_compact})}/>
            </Document>
            <a className="pdfDownload" href="./Resume.pdf" download><img src="pdfDownload.png"></img></a>
        </>);
    }

    renderSelectedView = (use_compact, projects_left) => {
        // Renders the appropriate view depending on the state of 'projects_left'

        return (<>
            <div className={clsx({projects: !use_compact, projects_C: use_compact,
                                  projectsLtoC: projects_left && !use_compact, projectsLtoC_C: projects_left && use_compact, 
                                  projectsCtoL: !projects_left && !use_compact, projectsCtoL_C: !projects_left && use_compact})}>
                {this.renderProjects()}
            </div>
            <div className={clsx({resume: !use_compact, resume_C: use_compact, 
                                  resumeRtoC: !projects_left && !use_compact, resumeRtoC_C: !projects_left && use_compact,
                                  resumeCtoR: projects_left && !use_compact, resumeCtoR_C: projects_left && use_compact})}>
                 {/* Rendering PDF file using 'react-pdf' npm module */}
                 {this.renderResume(use_compact)}
             </div>
        </>);
    }

    determineAboutInLineSpace = () => { // Brief helper to render space if using compact (i.e. no line break)
        if (this.state.use_compact) { return(" I make practical, user-oriented applications."); }
        return("I make practical, user-oriented applications.");
    }

    render() {
        // The main render function
        const use_compact = this.state.use_compact;
        const projects_left = this.state.projects_left;

        return (<>
            <div className={clsx({intro: !use_compact, intro_C: use_compact})}>
                <div className={clsx({introWelcome: !use_compact, introWelcome_C: use_compact})}>
                    Welcome<span className={clsx({welcomeComma: !use_compact, welcomeComma_C: use_compact})}>,</span>
                </div>
                <div className={clsx({nameVeil: !use_compact, nameVeil_C: use_compact})}></div>
                <div className={clsx({introName: !use_compact, introName_C: use_compact})}>I'm Nathan Raymant</div>
            </div>
            <div className="content">
                <div className={clsx({aboutBio: !use_compact, aboutBio_C: use_compact})}>
                    A Toronto based software developer and student. 
                    <br className={clsx({breakDisabled: use_compact})}/>
                    {this.determineAboutInLineSpace()}
                </div>
                {this.renderViewButtons(use_compact, projects_left)}
                {this.renderSelectedView(use_compact, projects_left)}
            </div>
        </>);
    }
}

export default App;
