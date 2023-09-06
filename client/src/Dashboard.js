import React, {useState, useEffect, useContext} from 'react';
import clsx from 'clsx';
import { Document, Page, pdfjs } from 'react-pdf';
import { Linking } from 'react-native'
import CompactContext from './context/CompactContext';
import ProjectItem from './components/ProjectItem';

import resumePDF from './resources/Resume.pdf';
import pdfDownloadSVG from './resources/pdfDownload.svg';

import './styles/Dashboard.css';
import './styles/DashCompact.css';
import './styles/ContactMe.css';
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

function Dashboard() {
    /* The code for the main page of the site */

    const {useCompact, setUseCompact} = useContext(CompactContext);
    const [projectsLeft, setProjectsLeft] = useState(true);

    // Hook updates the view_width state when the window is resized
    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        updateViewWidth();
        window.addEventListener('resize', updateViewWidth);

        return( () => window.removeEventListener('resize', updateViewWidth));
    }, []);

    const updateViewWidth = () => {
        setUseCompact(window.innerWidth < 900 ? true : false);
        if (useCompact) { console.log("Compact mode enabled"); }
    }

    const renderProjects = () => {
        /*  Renders the project items/cards using the ProjectItem React component.
            The content of the cards is passed through to the component code as properties.
        */

        return (<>
            {/* The required props are: <title=str> <description=str> <aLinkURL=str> <aLinkText=str> */}
            <ProjectItem title="Sayyara"
                            description={`A full stack React app which streamlines client-mechanic interaction for
                                          automotive repair.`}
                            aLinkURL=""
                            aLinkViewRef="Sayyara"
                            aLinkText="Learn more"
                            previewPath="project_previews/say_preview.mp4"
                            pThumbnailPath="project_previews/thumbnails/say_thumbnail.png"/>
            <ProjectItem title="SimpleScripter"
                            description={`A user-friendly Java Swing scripting application for automating desktop 
                                          inputs.`}
                            aLinkURL=""
                            aLinkViewRef="SimpleScripter"
                            aLinkText="Learn more"
                            previewPath="project_previews/ss_preview.mp4"
                            pThumbnailPath="project_previews/thumbnails/ss_thumbnail.png"/>
            <ProjectItem title="Invoice Demo"
                            description={`A front-end UX showcase. Built with ReactJS and styled 
                                          using TailwindCSS.`}
                            aLinkURL={useCompact ? "https://github.com/Nathan7934/InvoiceDemo" : "InvoiceDemo/index.html"}
                            aLinkText={useCompact ? "Source code" : "View demo"}
                            previewPath="project_previews/id_preview.mp4"
                            pThumbnailPath="project_previews/thumbnails/id_thumbnail.png"/>
            <ProjectItem title="QuizEra"
                            description={`A JavaScript library that allows 
                                          web developers to generate custom interactive timeline quizzes.`}
                            aLinkURL={useCompact ? "https://github.com/Nathan7934/QuizEra" : "QuizEra/demo.html"}
                            aLinkText={useCompact ? "Source code" : "View demo"}
                            previewPath="project_previews/qe_preview.mp4"
                            pThumbnailPath="project_previews/thumbnails/qe_thumbnail.png"/>
            {/* <ProjectItem title="Portfolio Site"
                            description={`Built using ReactJS. The styling, 
                                          animations, layouts and components were done by hand.`}
                            aLinkURL="https://github.com/Nathan7934/WebsitePortfolio"
                            aLinkText="Source code"
                            previewPath="project_previews/wp_preview.mp4"
                            pThumbnailPath="project_previews/thumbnails/wp_thumbnail.png"/> */}
            <ProjectItem title="Breakfast Club"
                            description={`A food-based social media prototype with an Express back end
                                          handling database queries.`}
                            aLinkURL="https://github.com/Nathan7934/BreakfastClub"
                            aLinkViewRef="BreakfastClub"
                            aLinkText="Source Code"
                            previewPath="project_previews/bc_preview.mp4"
                            pThumbnailPath="project_previews/thumbnails/bc_thumbnail.png"/>
            <ProjectItem title="Event Scheduler CLI"
                            description={`Includes a robust messenger subprogram complete with group
                                          conversations.`}
                            aLinkURL="https://github.com/Nathan7934/EventSchedulerCLI"
                            aLinkViewRef="ESCLI"
                            aLinkText="Source code"
                            previewPath="project_previews/es_preview.mp4"
                            pThumbnailPath="project_previews/thumbnails/es_thumbnail.png"/>
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
            <div className={clsx({viewButtons: !useCompact, viewButtons_C: useCompact})}>
                <button className={clsx({btnStyle: true, projectsBtn: !useCompact, projectsBtn_C: useCompact})}
                onClick={() => {
                    if (!projectsLeft) {
                        // play animation RtoL
                        setProjectsLeft(true);
                    }
                }}><div className={clsx({blackText: true, blackTextHoverable: !projectsLeft})}>
                    <div className="blackTextText">Projects</div></div>
                </button>
                <div className={clsx({viewIndicator: true,
                                      viewIndicatorRtoL: projectsLeft && !useCompact, viewIndicatorRtoL_C: projectsLeft && useCompact, 
                                      viewIndicatorLtoR: !projectsLeft && !useCompact, viewIndicatorLtoR_C: !projectsLeft && useCompact})}>  
                </div>
                <button className={clsx({btnStyle: true, resumeBtn: !useCompact, resumeBtn_C: useCompact})}
                onClick={() => {
                    if (projectsLeft) {
                        // play animation LtoR
                        setProjectsLeft(false);
                    }
                }}><div className={clsx({blackText: true, blackTextHoverable: projectsLeft})}>
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

    const renderResume = () => {
        if (useCompact) {
            return (<>
                <div style={{margin: "0 auto", maxWidth: "900px", textAlign: "center"}}>
                    <img src="resumeCompact.png" style={{maxWidth: "100%", height: "auto"}}></img>
                </div>
                <a className="pdfDownload" href="./Resume.pdf" download><img src="pdfDownload.png"></img></a>
            </>);
        }
        return (<>
            <Document file={resumePDF}>
                <Page pageNumber={1} onLoadSuccess={removeTextLayerOffset} />
            </Document>
            <a className="pdfDownload" href="./Resume.pdf" download><img src={pdfDownloadSVG}></img></a>
        </>);
    }

    const renderSelectedView = () => {
        // Renders the appropriate view depending on the state of 'projects_left'

        return (<>
            <div className={clsx({projects: !useCompact, projects_C: useCompact,
                                  projectsLtoC: projectsLeft && !useCompact, projectsLtoC_C: projectsLeft && useCompact, 
                                  projectsCtoL: !projectsLeft && !useCompact, projectsCtoL_C: !projectsLeft && useCompact})}>
                {renderProjects()}
            </div>
            <div className={clsx({resume: !useCompact, resume_C: useCompact, 
                                  resumeRtoC: !projectsLeft && !useCompact, resumeRtoC_C: !projectsLeft && useCompact,
                                  resumeCtoR: projectsLeft && !useCompact, resumeCtoR_C: projectsLeft && useCompact})}>
                 {/* Rendering PDF file using 'react-pdf' npm module */}
                 {renderResume()}
             </div>
        </>);
    }

    const determineAboutInLineSpace = () => { // Brief helper to render space if using compact (i.e. no line break)
        if (useCompact) { return(" I make practical, user-oriented applications."); }
        return("I make practical, user-oriented applications.");
    }

    return (<>
        <div className={clsx({intro: !useCompact, intro_C: useCompact})}>
            <div className={clsx({introWelcome: !useCompact, introWelcome_C: useCompact})}>
                Welcome<span className={clsx({welcomeComma: !useCompact, welcomeComma_C: useCompact})}>,</span>
            </div>
            <div className={clsx({nameVeil: !useCompact, nameVeil_C: useCompact})}></div>
            <div className={clsx({introName: !useCompact, introName_C: useCompact})}>I'm Nathan Raymant</div>
        </div>
        <div className={clsx({content: !useCompact, content_C: useCompact})}>
            <div className={clsx({aboutBio: !useCompact, aboutBio_C: useCompact})}>
                A Toronto based software developer. 
                {/* Conditional break not necessary with current about blurb length */}
                <br className={''/*clsx({breakDisabled: useCompact})*/}/>
                {determineAboutInLineSpace()}
            </div>
            {renderContacts()}
            {renderViewButtons()}
            {renderSelectedView()}
        </div>
    </>);
}

export default Dashboard;
