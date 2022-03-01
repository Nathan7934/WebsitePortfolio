"use strict";
// A timeline quiz generating library.
// Users enter details for a timeline, and the library generates a completable quiz.
const log = function(str) { console.log(`[QuizEra] ${str}`)};
$('head').append('<link rel="stylesheet" type="text/css" href="QuizEra.css">'); // TODO: Host stylesheet online?

(function(global, document, $) {
    function QuizEra() {
        // The libarary's constructor function holds data that should be unique across QuizEra instances.

        this.nodes = [];
        /* The nodes list will contain node objects formatted as:
        node = {
            year: int
            desc: string
        }
        There can only be one node per year. Use negative numbers for BC years. There must be at least two nodes.
        */
        this.unordered_nodes = [];
        // An unorder list of nodes, used to render randomized choices

        this.key = new Map();
        // An answer key map corresponding years to alphabetical tags. (year: tag)
        this.answers = new Map();
        // A map representing the user's selected answers. (year: tag)
        this.past_scores = [];
        // A list containing the scores of previous attempts. Ordered first to latest

        this.node_pts = [];
        // A list of HTML elements for each node point on the timeline
        this.node_questions = [];
        // A list of HTML elements for each node question (i.e. the blank nodes we need to fill in)
        this.node_choices = [];
        // A list of HTML elements for each choosable node (order based on unordered_nodes, not nodes)
    }

    QuizEra.prototype = {
        // Contains library functions accessible from any QuizEra instance

        createNode: function(event_year, event_desc) {
            // Creates a node using the parameters and adds it to the instances nodes list
            // Fails if a node with that year already exists, or if nodes capacity is reached

            let can_push = (this.nodes.length <= 26) ? true: false;
            if(can_push) {
                this.nodes.forEach(node => { if(node.year === event_year){ can_push = false; } })
            }
            if(can_push){
                // Find the correct position for the node
                let insertion_index = this.nodes.length;
                for (let i = 0; i < this.nodes.length; i++) {
                    if (event_year < this.nodes[i].year) {
                        insertion_index = i;
                        break;
                    }
                }
                this.nodes.splice(insertion_index, 0, {year: event_year, desc: event_desc});
            } else {
                log("Cannot add node. Either a node for this year already exists, or the maximum of 26 nodes is reached.");
            }
        },

        generateQuiz: function(width, border, parent_element_id) {
            // Generates the timeline quiz under the specified parent element in the DOM.
            // User can specify the width of the quiz in pixels, and whether the quiz should have a border.

            log(`Generating quiz with width ${width}px...`);
            const height = 400;
            const quiz_id = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(2, 6);
            
            // Ensuring the preconditions are met
            if (this.nodes.length < 2) {
                log('Didn\'t generate quiz. It must contain at least two nodes.');
                return;
            }
            if (width < 300) {
                log('Didn\'t generate quiz. Width must be at least 300px.');
                return;
            }
            if (!($(parent_element_id).length > 0)) {
                log('Didn\'t generate quiz. jQuery couldn\'t find the given parent element selector');
                return;
            }


            const _getYearString = (year) => {
                // Takes a year and returns the appropriate string representation.
                let year_str;
                if (year > 0) {
                    year_str = `${year} CE`;
                } else {
                    year_str = `${year} BC`;
                }
                return year_str;
            }

            const _tagInAnswers = (tag) => {
                // Returns whether the tag is present in the this.answers map
                for (const [key, value] of this.answers.entries()) {
                    if (tag === value) {
                        return true;
                    }
                }
                return false;
            }

            const _setNewVals = () => {
                // Updates tags in node_pts and node_questions to reflect the users currently selected answers
                // Updates node choices to display the year the user has selected

                for (let i = 0; i < this.nodes.length; i++) {
                    const year = `${this.nodes[i].year}`;

                    const q_element = this.node_questions[i];
                    const pt_element = this.node_pts[i];
                    if (this.answers.has(year)) {
                        const tag = this.answers.get(year);
                        q_element.lastElementChild.lastElementChild.firstElementChild.innerHTML = `<b>${tag}</b>`;
                        pt_element.firstElementChild.innerHTML = `<b>${tag}</b>`;
                    } else {
                        q_element.lastElementChild.lastElementChild.firstElementChild.innerHTML = '';
                        pt_element.firstElementChild.innerHTML = '';
                    }
                }
                for (const [key, value] of this.answers.entries()) {
                    const index = value.charCodeAt(0) - 65; // unordered_nodes is ordered alphabetically by tag, so this works
                    const year = _getYearString(parseInt(key));
                    this.node_choices[index].firstElementChild.innerHTML = `<b>${year}</b>`;
                }

                for (let i = 0; i < this.unordered_nodes.length; i++) {
                    if (!_tagInAnswers(String.fromCharCode(i+65))) {
                        let year_str;
                        if (this.unordered_nodes[i].year > 0) {
                            year_str = `??? CE`;
                        } else {
                            year_str = `??? BC`;
                        }
                        this.node_choices[i].firstElementChild.innerHTML = `<b>${year_str}</b>`;
                    }
                }
            }

            const _randomizeNodeOrder = () => {
                // Takes the instance's nodes list and randomizes the order, applying tags alphabetically based
                // on the new order. Then, it sets the unordered_nodes instance variable to the list.
                
                let unordered = this.nodes.slice(0); // Make a copy of our nodes list
                // Durstenfeld shuffle algorithm:
                for(let i = unordered.length-1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i+1));
                    [unordered[i], unordered[j]] = [unordered[j], unordered[i]];
                }
                // Now we generate the key:
                for(let i = 0; i < unordered.length; i++) {
                    this.key.set(`${unordered[i].year}`, String.fromCharCode(i+65));
                    // Alphabetical tags are generated based on the nodes' position in unordered
                }
                this.unordered_nodes = unordered;
            }

            const _handleNodeClick = (index) => {
                // This function handles the necessary actions when a node on the timeline is clicked
                // Generates the DOM for the nodes display.

                const node_q = $(this.node_questions[index]);
                if (node_q.is(":visible")) {
                    node_q.hide(125);
                } else {
                    for (let i = 0; i < this.node_questions.length; i++) {
                        if (i !== index && $(this.node_questions[i]).is(":visible")) {
                            $(this.node_questions[i]).hide(125);
                        }
                    }
                    node_q.show(125);
                }
            }

            const drag = (event) => {
                const tag = event.target.id.slice(-1);
                event.dataTransfer.setData("tag", tag);
            }

            const drop = (event) => {
                event.preventDefault();
                const tag = event.dataTransfer.getData("tag");
                const year = event.currentTarget.id.substring(2);

                // If we have already placed this tag to a different question, we need to remove it
                const keys_to_remove = [];
                for (const [key, value] of this.answers.entries()) {
                    if (year !== key && tag === value) {
                        keys_to_remove.push(key);
                    }
                }
                keys_to_remove.forEach(key => {this.answers.delete(key)});

                this.answers.set(year, tag);
                document.getElementById(`choice-${quiz_id}-${tag}`).style.backgroundColor = '#d3d3d3';
                _setNewVals();
            }

            const allowDrop = (event) => {
                event.preventDefault();
            }

            const _renderTimeline = () => {
                // Renders the line itself by creating three div elements: the line and endpoint arrows.

                const timeline = document.createElement('div');
                timeline.classList.add('timeline');
                timeline.style = `position: relative; top: 150px; width: ${width}px;`;
                const segment = document.createElement('div');
                segment.style = `position: relative; width: ${width-30}px; height: 4px; 
                    background-color: black; margin: auto;`;
                const left_endpt = document.createElement('div');
                left_endpt.style = `position: relative; bottom: 5px; right: 15px; width: 0; height: 0;
                    border-top: 7px solid transparent; border-right: 15px solid black; border-bottom: 7px solid transparent;`;
                const right_endpt = document.createElement('div');
                right_endpt.style = `position: relative; bottom: 19px; left: ${width-30}px; width: 0; height: 0;
                    border-top: 7px solid transparent; border-left: 15px solid black; border-bottom: 7px solid transparent;`;
                segment.appendChild(left_endpt);
                segment.appendChild(right_endpt);
                timeline.appendChild(segment);
                return timeline;
            }

            const _renderNodeQuestion = (i, position) => {
                // Creates a node question HTML element and adds it to this.node_questions
                // Node question elements are children of their respective node elements on the timeline
                // Should be called for each node in chronological order

                const node_q = document.createElement('div');
                node_q.classList.add('node-q');
                node_q.style = `position: absolute; bottom: 10px; width: 80px; height: 120px;`;
                const line = document.createElement('div');
                line.style = `position: absolute; bottom: 0px; width: 3px; height: 36px; background-color: black;`;
                const content_box = document.createElement('div');
                content_box.id = `q-${this.nodes[i].year}`;
                content_box.style = `position: absolute; top: 0px; width: 76px; height: 80px; border: 2px solid black;
                border-radius: 10%; background-color: white;`;
                content_box.innerHTML = `
                <div style='position: relative; top: 5px; text-align: center;'>
                    ${_getYearString(this.nodes[i].year)}</div>`;
                content_box.ondrop = drop;
                content_box.ondragover = allowDrop;
                const answer_field = document.createElement('div');
                answer_field.style = `position: absolute; bottom: 10px; left: 18px; width: 40px; height: 40px;
                    border: 1px solid #888; border-radius: 10%;`;
                // Below is where we put our answer tag
                answer_field.innerHTML = `<div style='position: absolute; left: 12px; bottom: 6px; font-size: 150%;'></div>`;
                content_box.appendChild(answer_field);

                // Accounting for if the parent node is on either edge of the timeline
                if (position < 30) {
                    node_q.style.left = `${position + 9}px`;
                    line.style.left = '0px';
                    line.style.height = '42px';
                } else if (position > width - 50) {
                    node_q.style.left = `${position - 68}px`;
                    line.style.right = '0px';
                    line.style.height = '42px';
                } else {
                    node_q.style.left = `${position - 30}px`;
                    line.style.left = '39px';
                }
                node_q.appendChild(line);
                node_q.appendChild(content_box);
                this.node_questions.push(node_q);
                $(node_q).hide();
            }

            const _populateTimeline = () => {
                // Populates the timeline with clickable nodes.
                // Returns a list of div elements that should be added to the timeline.
            
                const node_elements = [];
                // Adding style rules to the html, to allow for manipulation of pseudo-elements. Can't find any other way
                for (let i = 0; i < this.nodes.length; i++) {
                    // First we figure out the proportional spacing of the nodes, with the first and last node
                    // being at either end of the timeline.
                    let position;
                    if (i === 0) {
                        position = 20;
                    } else if (i === this.nodes.length-1) {
                        position = width-40;
                    } else {
                        const proportion = (this.nodes[i].year - this.nodes[0].year) / 
                                        (this.nodes[this.nodes.length-1].year - this.nodes[0].year);
                        position = Math.floor((width-50)*proportion) + 20;
                    }
                    const node = document.createElement('div');
                    node.id = `n-${this.nodes[i].year}`;
                    node.classList.add('node');
                    node.style.left = `${position}px`
                    node.innerHTML = `<div style='position: absolute; left: 4px; top: 1px; font-size: 75%'></div>`
                    node.onclick = () => {_handleNodeClick(i)};
                    node.ondrop = drop;
                    node.ondragover = allowDrop;
                    _renderNodeQuestion(i, position);
                    node_elements.push(node);
                }
                this.node_pts = node_elements;
                return node_elements;
            }

            const _renderNodeChoices = (node_list) => {
                // Creates and returns a div element in the DOM for the list of choosable nodes

                const node_choices = document.createElement('div');
                node_choices.classList.add('node-choices');
                node_choices.style = `position: absolute; bottom: 50px; width: ${width}px; height: 170px; 
                    white-space: nowrap; overflow-x: auto; overflow-y: hidden;`;

                // Create each individual option and append it to node_choices
                for (let i = 0; i < node_list.length; i++) {
                    const tag = String.fromCharCode(i+65);
                    let year = '';
                    if (node_list[i].year > 0) {
                        year = `<b>??? CE</b>`;
                    } else {
                        year = `<b>??? BC</b>`;
                    }

                    const choice = document.createElement('div');
                    choice.id = `choice-${quiz_id}-${tag}`;
                    choice.style = `position: relative; width: 125px; height: 145px; margin-right: 2px; margin-left: 2px;
                        border: 2px solid black; border-radius: 5%; display: inline-block;`;
                    choice.style.backgroundColor = 'white';
                    choice.innerHTML = `
                    <div style='position: absolute; top: 5px; left: 5px;'>${year}</div>
                    <div style='position: absolute; top: 3px; right: 5px; font-size: 150%;'><b>${tag}</b></div>
                    <div class='choice-desc' style='position: relative; top: 30px; height: 115px; 
                    margin-left: 5px; margin-right: 5px; overflow-y: auto; white-space: normal;'>${node_list[i].desc}</div>`;
                    choice.draggable = 'true';
                    choice.ondragstart = drag;
                    node_choices.appendChild(choice);
                    this.node_choices.push(choice);
                }
                return node_choices;
            }

            const _addPastAttempt = (attempts_list_elm) => {
                // Adds the latest score to the 'past attempts' window

                const attempt = document.createElement('li');
                const score = this.past_scores[this.past_scores.length-1];
                const text_color = (score === this.nodes.length) ? 'green' : 'red';
                attempt.innerHTML = `Attempt ${this.past_scores.length}: <span style='color: ${text_color};'><b>${score}/${this.nodes.length}</b></span>`;
                attempts_list_elm.firstElementChild.appendChild(attempt);
            }

            const _verify = (score, attempts_list_elm) => {
                // Checks the number of correctly placed nodes and displays a score

                const possible_points = this.nodes.length;
                let num_correct = 0;
                for (const [key, value] of this.key.entries()) {
                    if (this.answers.has(key)) {
                        const choice_element = document.getElementById(`choice-${quiz_id}-${this.answers.get(key)}`);
                        if (value === this.answers.get(key)) {
                            num_correct++;
                            choice_element.style.backgroundColor = '#95ffac'; // If the node is correctly placed, color the choice green
                        } else {
                            choice_element.style.backgroundColor = '#ffa1a1'; // If the node is incorrectly placed, color the choice red
                        }
                    }
                }
                this.past_scores.push(num_correct);
                if (num_correct === possible_points) {
                    score.innerHTML = `<span style='color: green;'><b>${num_correct}/${possible_points}</b></span>`;
                } else {
                    score.innerHTML = `<span style='color: red;'><b>${num_correct}/${possible_points}</b></span>`;
                }
                _addPastAttempt(attempts_list_elm);
            }

            const _reset = () => {
                // Resets the selected answers. Later version will reorder node choices as well

                this.answers = new Map();
                _setNewVals();
                for (let i = 0; i < this.node_questions.length; i++) {
                    if ($(this.node_questions[i]).is(":visible")) {
                        $(this.node_questions[i]).hide(125);
                    }
                    this.node_choices[i].style.backgroundColor = 'white';
                }
            }

            const main_container = document.createElement('div');
            main_container.classList.add('qe-main-container');
            main_container.style = `position: relative; width: ${width}px; height: ${height}px;`;
            if (border) {
                main_container.style.border = '2px solid black';
                main_container.style.borderRadius = '2%';
            }
            const timeline = _renderTimeline();
            const node_elements = _populateTimeline();
            node_elements.forEach(node => timeline.appendChild(node));
            this.node_questions.forEach(node_q => timeline.appendChild(node_q));

            _randomizeNodeOrder();
            const node_choices = _renderNodeChoices(this.unordered_nodes);

            const score = document.createElement('div');
            score.classList.add('score');
            score.style = `position: absolute; left: ${Math.floor(width/2)-20}px; bottom: 15px; font-size: 125%;`;

            const past_attempts = document.createElement('div');
            past_attempts.classList.add('past-attempts');
            past_attempts.style = `position: absolute; width: 200px; height: 200px; margin: auto; background-color: #f3f3f3;
            left: ${Math.floor(width/2)-100}px; top: 100px; border-radius: 5px; border: 2px solid black;`;
            past_attempts.innerHTML = `<div style='position: absolute; top: 5px; left: 43px; font-size: 125%'>Past Attempts</div>
                <div style='position: absolute; width: 175px; height: 2px; top: 35px; left: 15px; background-color: black;'></div>`;
            const attempts_list = document.createElement('div');
            attempts_list.style = `position: absolute; width: 170px; height: 150px; left: 15px; top: 40px; overflow-y: auto;`;
            attempts_list.innerHTML = `<ul></ul>`;
            past_attempts.appendChild(attempts_list);
            $(past_attempts).hide();

            const pa_btn = document.createElement('button');
            pa_btn.classList.add('pa-btn');
            pa_btn.type = 'button';
            pa_btn.innerText = 'Show attempts';
            pa_btn.style = `position: absolute; left: 0px; bottom: 20px;`;
            pa_btn.onclick = () => {
                if ($(past_attempts).is(":visible")) {
                    $(past_attempts).hide();
                    pa_btn.innerText = 'Show attempts';
                } else {
                    $(past_attempts).show();
                    pa_btn.innerText = 'Hide attempts';
                }
            }

            const verify_btn = document.createElement('button');
            verify_btn.classList.add('qe-btn');
            verify_btn.type = 'button';
            verify_btn.innerText = 'Done';
            verify_btn.style = `position: absolute; right: 10px; bottom: 10px; width: 60px; height: 30px; font-size: 115%;`;
            verify_btn.onclick = () => {_verify(score, attempts_list)};

            const reset_btn = document.createElement('button');
            reset_btn.classList.add('qe-btn');
            reset_btn.type = 'button';
            reset_btn.innerText = 'Reset';
            reset_btn.style = `position: absolute; right: 80px; bottom: 10px; width: 70px; height: 30px; font-size: 115%;`;
            reset_btn.onclick = () => {score.innerHTML = ''; _reset()};

            main_container.appendChild(timeline);
            main_container.appendChild(node_choices);
            main_container.appendChild(score);
            main_container.appendChild(past_attempts);
            main_container.appendChild(pa_btn);
            main_container.appendChild(verify_btn);
            main_container.appendChild(reset_btn);
            $(parent_element_id).append(main_container);
            log("Quiz generated.");
        }
    }

    global.QuizEra = global.QuizEra || QuizEra

})(window, window.document, $);
