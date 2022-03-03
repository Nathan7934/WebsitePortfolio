import React from 'react';

import '../styles/SimpleScripterDemo.css'
import screenshot1 from "../resources/ss_screenshot_1.png";
import screenshot2 from "../resources/ss_screenshot_2.png";
import SimpleScripterJAR from "../resources/SimpleScripterJAR.zip";

class SimpleScripterDemo extends React.Component {
    render() {
        return(<>
            <div className="ssTitleHeader">SimpleScripter</div>
            <div className="ssContent">
                <div className="blurbWrapper">
                    <div className="ssIntroBlurb">
                        My largest and most complex project, <i>SimpleScripter</i> is a fully fledged desktop application that allows users to create
                        scripts that simulate native desktop inputs. Other scripting applications may be daunting to a casual user due to their complexity,
                        so I designed SimpleScripter to be intuitive and easy to use. Users of <i>all levels of technical proficiency</i> will find that they can
                        start making scripts immediately.<br/><br/>
                    </div>
                </div>
                <div className="ssFeaturesHeader">Features include:</div>
                <div className="ssFeatures">
                    {/* <span style={{fontWeight: "600"}}>Features include:</span> */}
                    <ul>
                        <li>Queuing both 'simple' and 'parameter' commands using the command buttons
                            <ul>
                                <li>Commands vary in complexity. A simple command (e.g. "Left Click") requires no further input, while a
                                    parameter command such as "Wait" requires the user to specify a time in ms.</li>
                                <li>Commands can be rearranged or deleted using the arrow buttons and 'x' button respectively.</li>
                                <li>Some commands are paired with a second command (e.g. "Release Key" must follow "Hold Key"). The UI will 
                                    highlight the paired command in green when either is selected.</li>
                            </ul>
                        </li>
                        <li>Creating <span style={{fontWeight: "600"}}>nested loops</span> of commands
                            <ul>
                                <li>If your script includes repeating commands, you can create a <i>loop</i> to avoid repetition. 
                                Furthermore, <i>loops can be placed within other loops</i> to allow even more complexity.</li>
                            </ul>
                        </li>
                        <li>Configuring your experience with the <span style={{fontWeight: "600"}}>program settings window</span>
                            <ul>
                                <li>Settings include: Specifying a delay between commands, choosing whether to
                                    minimize the program on script execution, setting an autosave interval, and more...
                                </li>
                            </ul>
                        </li>
                        <li><span style={{fontWeight: "600"}}>Saving your scripts</span> as '.ss' (SimpleScripter) files</li>
                    </ul>
                </div>
                <div className="ssScreenshots">
                    <img className="ssScreenshot1" src={screenshot1}></img>
                    <img className="ssScreenshot2" src={screenshot2}></img>
                </div>
                <div className="ssClosingRemarks">
                    Download the program yourself to try it out <br/>(Windows & Java Required):
                </div>
                <div className="ssDownload">
                    <a className="ssDButton ssDjar" href={SimpleScripterJAR} download="SimpleScripterJAR.zip">Download (.jar)</a>
                </div>
            </div>
        </>);
    }
}
export default SimpleScripterDemo;