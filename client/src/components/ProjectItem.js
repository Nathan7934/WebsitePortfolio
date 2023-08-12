import React from 'react';
import {useContext} from 'react';
import clsx from 'clsx';
import HoverVideoPlayer from 'react-hover-video-player';
import { Link } from "react-router-dom";
import CompactContext from '../context/CompactContext';

import './ProjectItem.css';

// 360x220

function ProjectItem (props){
    /*  The component for a single project item/card.
        The required props are: <title=str> <description=str> <aLinkURL=str> <aLinkText=str> ?<aLinkViewRef=str>?

        If the access link should point to a React view, set aLinkURL="" and include the aLinkViewRef prop with
        the appropriate reference string to the component (defined in renderAccessLink()).
        If it's to be a standard link, omit aLinkViewRef and include the URL string in aLinkURL.
    */

    const {useCompact} = useContext(CompactContext);
    const {title, description, aLinkURL, aLinkText, aLinkViewRef, previewPath, pThumbnailPath} = props;

    const determinePauseOverlay = () => {
        if (useCompact) {
            return (<img src={pThumbnailPath} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>);
        }
        return (<div className="previewVeil">
            <div className="previewVeilText">{title}</div>
        </div>);
    }

    const ifCompactRenderTitle = () => {
        if (useCompact) {
            return (<div className="title">{title}</div>);
        }
        return (<></>);
    }

    const renderAccessLink = () => {
        if (aLinkURL == "") {
            switch(aLinkViewRef) {
                case "Sayyara":
                    return (<>
                        <Link className="accessLink" to="./SayyaraDemo" target="_blank" rel="noopener noreferrer">
                            {aLinkText}
                        </Link>
                    </>);
                case "SimpleScripter":
                    return (<>
                        <Link className="accessLink" to="./SimpleScripter" target="_blank" rel="noopener noreferrer">
                            {aLinkText}
                        </Link>
                    </>);
                case "BreakfastClub":
                    return (<>
                        <Link className="accessLink" to="./BreakfastClub" target="_blank" rel="noopener noreferrer">
                            {aLinkText}
                        </Link>
                    </>);
                case "ESCLI":
                    return (<>
                        <Link className="accessLink" to="./EventSchedulerCLI" target="_blank" rel="noopener noreferrer">
                            {aLinkText}
                        </Link>
                    </>);
                default:
                    return (<a className="accessLink" href={aLinkURL} target="_blank">{aLinkText}</a>);
            }
        }
        return (<a className="accessLink" href={aLinkURL} target="_blank">{aLinkText}</a>);
    }

    return (<>
        <div className="projectItem">
            <HoverVideoPlayer className="previewGif"
                videoSrc={previewPath}
                pausedOverlay={determinePauseOverlay()}
                loadingOverlay={
                    <div className="loading-overlay">
                        <div className="loading-spinner" />
                    </div>
                }
                preload={clsx({auto: !useCompact, metadata: useCompact})}
            />
            <div className="projectInfo">
                {ifCompactRenderTitle()}
                <div className="description">{description}</div>
                {renderAccessLink()}
            </div>
        </div>
    </>);
}

export default ProjectItem;