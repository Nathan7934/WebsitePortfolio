import React, {useState, useEffect} from 'react';
import HoverVideoPlayer from 'react-hover-video-player';
import clsx from 'clsx';

import '../styles/SayyaraDemo.css';

function SayyaraDemo() {

    const [use_compact, setUseCompact] = useState(window.innerWidth < 900 ? true : false);

    // Hook updates the view_width state when the window is resized
    // TODO: This is duplicated from Dashboard.js - in the future, update the site to utilize a Context hook.
    useEffect(() => {
        updateViewWidth();
        window.addEventListener('resize', updateViewWidth);

        return( () => window.removeEventListener('resize', updateViewWidth));
    }, []);

    const updateViewWidth = () => {
        setUseCompact(window.innerWidth < 900 ? true : false);
        if (use_compact) { console.log("Compact mode enabled"); }
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
        <div className='subHeader'>UI/UX Showcase:</div>
        <div id='sShowcasePreamble'>The pages and components displayed below were designed and implemented by myself.</div>
        <div className='showcaseHeader'>Responsive layouts:</div>
        <HoverVideoPlayer className='responsiveShowcase'
            videoSrc="Sayyara/reponsive_big.mp4"
            pausedOverlay={<img src="Sayyara/responsive_overlay.png" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>}
            restartOnPaused/>
        <div className='showcaseHeader'>Homepage with custom navigation menu and CSS animations:</div>
        <HoverVideoPlayer className='homepageShowcase'
            videoSrc="Sayyara/homepage.mp4"
            pausedOverlay={<img src="Sayyara/homepage_overlay.png" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>}
            restartOnPaused/>
        <div style={{width: '100%', textAlign: 'left'}}>
            <div className='showcaseHeader'>"Sign Up" form with real time validation:</div>
            <HoverVideoPlayer className='signupShowcase'
                videoSrc="Sayyara/signup.mp4"
                pausedOverlay={<img src="Sayyara/signup_overlay.png" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>}
                restartOnPaused/>
        </div>
        <div className='subHeader'>Links and Additional Information:</div>
        <div id='sLinks'>
            Of course, this page is not exhaustive. More information about this project - such as the full list of features - can be found at the following links:
        </div>
    </div>);
}

export default SayyaraDemo;