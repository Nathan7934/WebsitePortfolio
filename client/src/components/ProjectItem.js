import React from 'react';
import clsx from 'clsx';
import HoverVideoPlayer from 'react-hover-video-player';

import './ProjectItem.css';

// 360x220

class ProjectItem extends React.Component {
    /*  The component for a single project item/card.
        The required props are: <title=str> <description=str> <aLinkURL=str> <aLinkText=str>
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
                    <a className="accessLink" href={aLinkURL} target="_blank">{aLinkText}</a>
                </div>
            </div>
        </>);
    }
}

export default ProjectItem;