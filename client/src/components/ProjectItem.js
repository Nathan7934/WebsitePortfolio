import React from 'react';
import clsx from 'clsx';
import HoverVideoPlayer from 'react-hover-video-player';
import { Link } from "react-router-dom";

import './ProjectItem.css';

// 360x220

class ProjectItem extends React.Component {
    /*  The component for a single project item/card.
        The required props are: <title=str> <description=str> <aLinkURL=str> <aLinkText=str> ?<aLinkViewRef=str>?

        If the access link should point to a React view, set aLinkURL="" and include the aLinkViewRef prop with
        the appropriate reference string to the component (defined in renderAccessLink()).
        If it's to be a standard link, omit aLinkViewRef and include the URL string in aLinkURL.
    */

    determinePauseOverlay = () => {
        const {title, pThumbnailPath, use_compact} = this.props;
        if (use_compact) {
            return (<img src={pThumbnailPath} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>);
        }
        return (<div className="previewVeil">
            <div className="previewVeilText">{title}</div>
        </div>);
    }

    ifCompactRenderTitle = () => {
        const {title, use_compact} = this.props;
        if (use_compact) {
            return (<div className="title">{title}</div>);
        }
        return (<></>);
    }

    renderAccessLink = () => {
        const {aLinkURL, aLinkText, aLinkViewRef} = this.props;
        if (aLinkURL == "") {
            switch(aLinkViewRef) {
                case "SimpleScripter":
                    return (<>
                        <Link to={"./SimpleScripter"} target="_blank" rel="noopener noreferrer">
                            <a className="accessLink">{aLinkText}</a>
                        </Link>
                    </>);
                case "BreakfastClub":
                    return (<>
                        <Link to={"./BreakfastClub"} target="_blank" rel="noopener noreferrer">
                            <a className="accessLink">{aLinkText}</a>
                        </Link>
                    </>);
                case "QuizEra":
                    return(<a className="aLinkUnclickable">Use PC to learn more</a>)
                case "ESCLI":
                    return (<>
                        <Link to={"./EventSchedulerCLI"} target="_blank" rel="noopener noreferrer">
                            <a className="accessLink">{aLinkText}</a>
                        </Link>
                    </>);
                default:
                    return (<a className="accessLink" href={aLinkURL} target="_blank">{aLinkText}</a>);
            }
        }
        return (<a className="accessLink" href={aLinkURL} target="_blank">{aLinkText}</a>);
    }

    render() {
        const {description, aLinkURL, aLinkText, previewPath, use_compact} = this.props;

        return (<>
            <div className="projectItem">
                <HoverVideoPlayer className="previewGif"
                    videoSrc={previewPath}
                    pausedOverlay={this.determinePauseOverlay()}
                    loadingOverlay={
                        <div className="loading-overlay">
                            <div className="loading-spinner" />
                        </div>
                    }
                    preload={clsx({auto: !use_compact, metadata: use_compact})}
                />
                <div className="projectInfo">
                    {this.ifCompactRenderTitle()}
                    <div className="description">{description}</div>
                    {this.renderAccessLink()}
                </div>
            </div>
        </>);
    }
}

export default ProjectItem;