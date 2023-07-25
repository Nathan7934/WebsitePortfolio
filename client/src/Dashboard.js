import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { Document, Page } from 'react-pdf';
import { Linking } from 'react-native'

import ProjectItem from './components/ProjectItem';
import resumePDF from './resources/Resume.pdf';
import './styles/Dashboard.css';
import './styles/DashCompact.css';
import './styles/ContactMe.css';
function Dashboard() {
    /* The code for the main page of the site */

    const [use_compact, setUseCompact] = useState(window.innerWidth < 900 ? true : false);
    const [projects_left, setProjectsLeft] = useState(true);

    // Hook updates the view_width state when the window is resized
    useEffect(() => {
        updateViewWidth();
        window.addEventListener('resize', updateViewWidth);

        return( () => window.removeEventListener('resize', updateViewWidth));
    }, []);

    const updateViewWidth = () => {
        setUseCompact(window.innerWidth < 900 ? true : false);
        if (use_compact) { console.log("Compact mode enabled"); }
    }

    const renderProjects = (use_compact) => {
        /*  Renders the project items/cards using the ProjectItem React component.
            The content of the cards is passed through to the component code as properties.
        */

        return (<>
            {/* The required props are: <title=str> <description=str> <aLinkURL=str> <aLinkText=str> */}
            <ProjectItem title="SimpleScripter"
                            description={`A user-friendly Java Swing scripting application for automating desktop 
                                          inputs.`}
                            aLinkURL=""
                            aLinkViewRef="SimpleScripter"
                            aLinkText="Learn more"
                            previewPath="project_previews/ss_preview.mp4"
                            pThumbnailPath="project_previews/thumbnails/ss_thumbnail.png"
                            use_compact={use_compact}/>
            <ProjectItem title="QuizEra"
                            description={`A JavaScript library that allows 
                                          web developers to generate custom interactive timeline quizzes.`}
                            aLinkURL={use_compact ? "https://github.com/Nathan7934/QuizEra" : "QuizEra/demo.html"}
                            aLinkText={use_compact ? "Source code" : "Learn more"}
                            previewPath="project_previews/qe_preview.mp4"
                            pThumbnailPath="project_previews/thumbnails/qe_thumbnail.png"
                            use_compact={use_compact}/>
            <ProjectItem title="Invoice Demo"
                            description={`A front-end UX showcase. Built with ReactJS and styled 
                                          using TailwindCSS.`}
                            aLinkURL={use_compact ? "https://github.com/Nathan7934/InvoiceDemo" : "InvoiceDemo/index.html"}
                            aLinkText={use_compact ? "Source code" : "View demo"}
                            previewPath="project_previews/id_preview.mp4"
                            pThumbnailPath="project_previews/thumbnails/id_thumbnail.png"
                            use_compact={use_compact}/>
            <ProjectItem title="Portfolio Site"
                            description={`Built using ReactJS. The styling, 
                                          animations, layouts and components were done by hand.`}
                            aLinkURL="https://github.com/Nathan7934/WebsitePortfolio"
                            aLinkText="Source code"
                            previewPath="project_previews/wp_preview.mp4"
                            pThumbnailPath="project_previews/thumbnails/wp_thumbnail.png"
                            use_compact={use_compact}/>
            <ProjectItem title="Breakfast Club"
                            description={`A food-based social media prototype with an Express back end
                                          handling database queries.`}
                            aLinkURL="https://github.com/Nathan7934/BreakfastClub"
                            aLinkViewRef="BreakfastClub"
                            aLinkText="Source Code"
                            previewPath="project_previews/bc_preview.mp4"
                            pThumbnailPath="project_previews/thumbnails/bc_thumbnail.png"
                            use_compact={use_compact}/>
            <ProjectItem title="Event Scheduler CLI"
                            description={`Includes a robust messenger subprogram complete with group
                                          conversations.`}
                            aLinkURL="https://github.com/Nathan7934/EventSchedulerCLI"
                            aLinkViewRef="ESCLI"
                            aLinkText="Source code"
                            previewPath="project_previews/es_preview.mp4"
                            pThumbnailPath="project_previews/thumbnails/es_thumbnail.png"
                            use_compact={use_compact}/>
        </>);
    }

    const renderContacts = () => {
        /*  Renders the contact buttons (linkedIn, email, GitHub)
        */
        return(<>
            <a className="linkedIn contactIco" href="https://www.linkedin.com/in/nathanraymant/" target="_blank">
                <img src="contact_icons/linkedin.png" width="100%" height="100%"></img>
            </a>
            <a className="email contactIco" onClick={() => Linking.openURL('mailto:nathanraymant@gmail.com')}>
                <img src="contact_icons/email.png" width="100%" height="100%"></img>
            </a>
            <a className="gitHub contactIco" href="https://github.com/Nathan7934" target="_blank">
                <img src="contact_icons/github.png" width="100%" height="100%"></img>
            </a>
        </>);
    }

    const renderViewButtons = () => {
        /*  Renders the view select buttons (i.e., the 'Projects' and 'Résumé' buttons).
            Animations are controlled by conditionally adding CSS classes using the 'clsx' module and states.
        */
        return (<>
            <div className={clsx({viewButtons: !use_compact, viewButtons_C: use_compact})}>
                <button className={clsx({btnStyle: true, projectsBtn: !use_compact, projectsBtn_C: use_compact})}
                onClick={() => {
                    if (!projects_left) {
                        // play animation RtoL
                        setProjectsLeft(true);
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
                    if (projects_left) {
                        // play animation LtoR
                        setProjectsLeft(false);
                    }
                }}><div className={clsx({blackText: true, blackTextHoverable: projects_left})}>
                    <div className="blackTextText">R&eacute;sum&eacute;</div></div>
                </button>
            </div>
        </>);
    }

    const removeTextLayerOffset = () => {
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

    const renderResume = (use_compact) => {
        if (use_compact) {
            return (<>
                <div style={{margin: "0 auto", maxWidth: "900px", textAlign: "center"}}>
                    <img src="resumeCompact.png" style={{maxWidth: "100%", height: "auto"}}></img>
                </div>
                <a className="pdfDownload" href="./Resume.pdf" download><img src="pdfDownload.png"></img></a>
            </>);
        }
        return (<>
            <Document file={resumePDF}>
                <Page pageNumber={1} onLoadSuccess={removeTextLayerOffset}
                      className={clsx({pdfPage_C: use_compact})}/>
            </Document>
            <a className="pdfDownload" href="./Resume.pdf" download><img src="pdfDownload.png"></img></a>
        </>);
    }

    const renderSelectedView = () => {
        // Renders the appropriate view depending on the state of 'projects_left'

        return (<>
            <div className={clsx({projects: !use_compact, projects_C: use_compact,
                                  projectsLtoC: projects_left && !use_compact, projectsLtoC_C: projects_left && use_compact, 
                                  projectsCtoL: !projects_left && !use_compact, projectsCtoL_C: !projects_left && use_compact})}>
                {renderProjects(use_compact)}
            </div>
            <div className={clsx({resume: !use_compact, resume_C: use_compact, 
                                  resumeRtoC: !projects_left && !use_compact, resumeRtoC_C: !projects_left && use_compact,
                                  resumeCtoR: projects_left && !use_compact, resumeCtoR_C: projects_left && use_compact})}>
                 {/* Rendering PDF file using 'react-pdf' npm module */}
                 {renderResume(use_compact)}
             </div>
        </>);
    }

    const determineAboutInLineSpace = () => { // Brief helper to render space if using compact (i.e. no line break)
        if (use_compact) { return(" I make practical, user-oriented applications."); }
        return("I make practical, user-oriented applications.");
    }

    return (<>
        <div className={clsx({intro: !use_compact, intro_C: use_compact})}>
            <div className={clsx({introWelcome: !use_compact, introWelcome_C: use_compact})}>
                Welcome<span className={clsx({welcomeComma: !use_compact, welcomeComma_C: use_compact})}>,</span>
            </div>
            <div className={clsx({nameVeil: !use_compact, nameVeil_C: use_compact})}></div>
            <div className={clsx({introName: !use_compact, introName_C: use_compact})}>I'm Nathan Raymant</div>
        </div>
        <div className={clsx({content: !use_compact, content_C: use_compact})}>
            <div className={clsx({aboutBio: !use_compact, aboutBio_C: use_compact})}>
                A Toronto based software developer and student. 
                <br className={clsx({breakDisabled: use_compact})}/>
                {determineAboutInLineSpace()}
            </div>
            {renderContacts()}
            {renderViewButtons()}
            {renderSelectedView()}
        </div>
    </>);
}

export default Dashboard;
