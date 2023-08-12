import React, {useState, useEffect, useContext} from 'react';
import HoverVideoPlayer from 'react-hover-video-player';
import clsx from 'clsx';
import CompactContext from '../context/CompactContext';

import '../styles/SayyaraDemo.css';

function SayyaraDemo() {

    const {useCompact, setUseCompact} = useContext(CompactContext);

    // Hook updates the view_width state when the window is resized
    // TODO: This is duplicated from Dashboard.js - in the future, update the site to utilize a Context hook.
    useEffect(() => {
        updateViewWidth();
        window.addEventListener('resize', updateViewWidth);

        return( () => window.removeEventListener('resize', updateViewWidth));
    }, []);

    const updateViewWidth = () => {
        setUseCompact(window.innerWidth < 900 ? true : false);
        if (useCompact) { console.log("Compact mode enabled"); }
    }

    return (<div id="sContentWrapper">
        <div id="sTitleHeader">Sayyara</div>
        <div id="sIntroBlurb">
            Sayyara is a full stack web application which <span className='italicized'>streamlines client-mechanic interaction</span> for automotive repair. Created by a group of 5 individuals 
            composed of <span className='italicized'>frontend</span> and <span className='italicized'>backend</span> developers (including myself), Sayyara was developed over the course of 4 months as the focus of a Software 
            Engineering course at the University of Toronto. The application is built with a frontend utilizing <span className="bolded">React</span>,
            <span className="bolded"> TypeScript</span>, and <span className="bolded">TailwindCSS</span>, and a backend utilizing <span className="bolded"> SpringBoot</span> and 
            <span className="bolded"> PostgreSQL</span>.
            <br/><br/>
            Sayyara is a <span className='italicized'>fully functional prototype</span> that demonstrates the core functionality of the application, as specified by our partner who commissioned 
            the project.
        </div>
        <div className='subHeader'>UI/UX Showcase:</div>
        <div id='sShowcasePreamble'>The pages and components displayed below were designed and implemented by myself.</div>
        <div className='showcaseHeader'>Responsive layouts:</div>
        <HoverVideoPlayer className='responsiveShowcase'
            videoSrc="Sayyara/reponsive_big.mp4"
            pausedOverlay={<img src={useCompact ? "Sayyara/c_responsive_overlay.png" : "Sayyara/responsive_overlay.png"} 
                            alt="" style={{width: '100%', height: '100.25%', objectFit: 'cover'}}/>}
            restartOnPaused
            controls={useCompact}/>
        <div className='showcaseHeader'>Homepage with custom navigation menu and CSS animations:</div>
        <HoverVideoPlayer className='homepageShowcase'
            videoSrc="Sayyara/homepage.mp4"
            pausedOverlay={<img src={useCompact ? "Sayyara/c_homepage_overlay.png" : "Sayyara/homepage_overlay.png"} 
                                alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>}
            restartOnPaused
            controls={useCompact}/>
        <div style={{width: '100%', textAlign: 'left'}}>
            <div className='showcaseHeader'>"Sign Up" form with real time validation:</div>
            <HoverVideoPlayer className='signupShowcase'
                videoSrc="Sayyara/signup.mp4"
                pausedOverlay={<img src={useCompact ? "Sayyara/c_signup_overlay.png" : "Sayyara/signup_overlay.png"} 
                                alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>}
                restartOnPaused/>
        </div>
        <div className='subHeader'>My Contributions:</div>
        <div id='sMyContributions'>
            As the primary frontend developer, I designed and implemented the core frontend pages and components.
            <ul>
                <li>Said pages and components were designed to be <span className='bolded'>fully responsive</span>, with dynamic and flexible layouts providing a comfortable experience for any device.</li>
                <li>Laid the groundwork for Sayyara's overall UI/UX experience, providing <span className='bolded'>component templates</span> for other frontend developers on the team.</li>
            </ul>
            I oversaw the frontend's integration with the backend through careful utilization of the rich and flexible <span className='bolded'>REST API</span> provided by the backend team.
            <ul>
                <li>This was achieved through the implementation of <span className='bolded'>custom React hooks</span> for <span className='bolded'>fetch API</span> calls, which standardized and simplified database 
                communication throughout the frontend.</li>
            </ul>
            I managed and implemented the <span className='bolded'>authentication framework</span> for the application's frontend, built upon the <span className='bolded'>JWT</span> authentication system provided by the backend team.
            <ul>
                <li>To accomplish this, I created <span className='bolded'>React hooks</span> which <span className='italicized'>wrap all API calls</span> and automatically attach the appropriate <span className='bolded'>JWT tokens</span> to the request header.</li>
                <li><span className='bolded'>Access tokens</span> for short-term authentication were stored with the browser instance using the <span className='bolded'>React Context hook</span> to avoid prop drilling, whereas 
                <span className='bolded'> refresh tokens</span> were stored locally within the user's <span className='bolded'>browser cookies</span> for long-term retrieval.</li>
            </ul>
        </div>
        <div className='subHeader'>Links and Additional Information:</div>
        <div id='sLinks'>
            More information about this project can be found at the following links:
            <div className='sLinkItem'>
                <a className='sLink' href='https://www.youtube.com/watch?v=UtZrf9WLq-E' target='_blank' rel='noopener'>Video Presentation</a> 
                <br/> The recording of our group's final presentation to our partner and overseer, with myself as the first to speak. This video provides full context for the project, and contains the following in order:
                <ul>
                    <li>Introduction to the project, its inception, and its <span className='italicized'>goals</span></li>
                    <li>Live <span className='italicized'>demonstration</span> of the application showcasing all implemented features</li>
                    <li>API documentation and overview of the application's <span className='italicized'>architecture</span></li>
                    <li>Discussion of the strengths and weaknesses of our team's development process</li>
                </ul>
            </div>
            <div className='sLinkItem'>
                <a className='sLink' href='https://github.com/Nathan7934/Sayyara' target='_blank' rel='noopener'>GitHub Repository</a>
                <br/> The repository for the project, containing all source code for the frontend and backend. Here you will find the commit history as well as instructions on how to build the program. 
                I would also encourage taking a look at the list of <a id='prLink' href='https://github.com/csc301-fall-2022/team-project-16-sayyara-m/pulls?q=is%3Apr+is%3Aclosed+author%3ANathan7934' target='_blank' rel='noopener'>my pull requests</a>, 
                as they provide a more detailed overview of my contributions.
            </div>
        </div>
    </div>);
}

export default SayyaraDemo;