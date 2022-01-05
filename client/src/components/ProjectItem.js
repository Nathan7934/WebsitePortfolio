import React from 'react';

import './ProjectItem.css';

// 360x220

class ProjectItem extends React.Component {
    /*  The component for a single project item/card.
        The required props are: <title=str> <description=str> <aLinkURL=str> <aLinkText=str>
    */

    render() {
        const {title, description, aLinkURL, aLinkText} = this.props;

        return (<>
            <div className="projectItem">
                <div className="previewGif">Preview gif</div>
                <div className="projectInfo">
                    <div className="title">{title}</div>
                    <div className="description">{description}</div>
                    <a className="accessLink" href={aLinkURL}>{aLinkText}</a>
                </div>
            </div>
        </>);
    }
}

export default ProjectItem;