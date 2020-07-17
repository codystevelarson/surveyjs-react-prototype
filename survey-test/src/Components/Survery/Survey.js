import React, {Component} from 'react';
import * as Sjs from 'survey-react';
 import "survey-react/survey.css";

class Survey extends Component {
    state = {
        json: null,
        model: null,
        issues: []
    }
    

    onComplete(survey, options){
        // Save survey.data here 
        // Send to api

        // Example:
        console.log("Survey", survey);
        console.log("Options", options);
        console.log("Data",survey.data);
    }

    componentDidMount(){
        // Load survey here since it relies on API data
        setTimeout(() => {
            this.loadSurveyData();
        }, 2000)
    }

    loadSurveyData() {
        // Fetch Form Data from api here
        // Store in state and use the data json to create survey model
        // Example
        const formData = {
            "title": "SSSF Form Prototype",
            "questions": [
                {
                    "name": "name",
                    "type": "text",
                    "title": "Please enter your name:",
                    "placeHolder": "Jon Snow",
                    "isRequired": true,
                }, {
                    "name": "birthdate",
                    "type": "text",
                    "inputType": "date",
                    "title": "Your birthdate:",
                    "isRequired": true
                }, {
                    "name": "color",
                    "type": "text",
                    "inputType": "color",
                    "title": "Your favorite color:"
                }, {
                    "name": "email",
                    "type": "text",
                    "inputType": "email",
                    "title": "Your e-mail:",
                    "placeHolder": "jon.snow@nightwatch.org",
                    "isRequired": true,
                    "validators": [
                        {
                            "type": "email"                            
                        }
                    ]
                }
            ]}
        let model = new Sjs.Model(formData);


        // Fetch Entry Data from Api here
        // Example:
        const entrydata = {name: "Cody", birthdate: "1989-08-07", color: "#2990ff", email: "test@test.com"}; // EXAMPLE DATA
        model.data = entrydata;


        // Fetch Issue Data from api here
        // Example:
        // Multiple issues for 1 question
        const issues = [
            {
                question: "name",
                comment: "This name does not match our records"
            },
            {
                question: "color",
                comment: "Color is ugly"
            },
            {
                question: "color",
                comment: "Color does not exist"
            }
        ];

        // Update state survey model and issues
        this.setState({model: model, issues: issues, json: formData});
        // this.addIssueButtons(model);
        
    }

    clearSurvey() {
        // Clears all values in the inputs
        this.state.model.clear();
    }

    qaValidator(s, options){
        console.log("survey", s);
        console.log("options", options);

        // Add any custom global validation here 
        // Example:
        if(options.name === "name") {
            if (options.value === "fjorge")
            options.error = "CUSTOM VALIDATION: Name cannot be fjorge";
        }
    }

    addIssue(question) {
        // User properties from question to add an issue
        // Can display a modal with a question info and comment box 
        // Then save the issue in the DB

        //Example
        alert("ADDING issue to " + question.name);  
        console.log(question);
    }

    viewIssue(question){
        // View and handle Issue for question
        // Can check user access to allow resolution of issue, etc.

        // Example
        const issues = this.state.issues.filter(i => i.question === question.name);
        let comments = '';
        issues.forEach(i => comments += "-" + i.comment + "\n")
        alert(`Issue: ${question.name}\n${comments}`);  
        console.log(question);
    }

    addIssueButtons(model) {
        let self = this;
        model.onAfterRenderQuestion.add((survey, options) => {
            //Find issue for question
            let hasIssue = this.state.issues.find(i => i.question === options.question.name);
            console.log("Issue for btns", hasIssue);

            // Possible to add multiple buttons conditionally
            let btns = [];
            let btn = null;
            var question = options.question;
            // Create issue buttons
            if (hasIssue){
                btn = document.createElement('button');
                btn.type = "button";
                btn.style.margin = "5px";

                btn.className = `issue-btn btn ${hasIssue ? "btn-danger" : ""}`; 
                btn.innerHTML = hasIssue ? "View Issue" : "Add Issue";
                
                btn.onclick = function () {
                    self.viewIssue(question);
                };

                btns.push(btn);
            }

            btn = document.createElement('button');
            btn.type = "button";
            btn.style.margin = "5px";

            btn.className = `issue-btn btn`; 
            btn.innerHTML = "Add Issue";
            
            btn.onclick = function () {
                self.addIssue(question);
            };
            btns.push(btn);

            // Render HTML
            var header = options.htmlElement.querySelector("h5");
            if (hasIssue){
                header.style.color = "red";
            }
            var span = document.createElement("span");
            span.style.position = "absolute";
            span.style.right = "28px";
            header.parentElement.style.display = "flex";
            header.parentElement.style.flexFlow = "row";
            header.parentElement.append(span);
            
            btns.map(b => {
                return span.append(b);
            })
        });
    }

    render() {
        // Don't think this check is needed anymore
        // Leaving it in to show the possible ways to handle errors.
        let survey = (<h2>Loading...</h2>);
        if(this.state.model !== null){
            this.addIssueButtons(this.state.model);
            survey = (
            <Sjs.Survey 
                model={this.state.model} 
                onComplete={(survey, options) => this.onComplete(survey, options)}
                onValidateQuestion={this.qaValidator}/> 
            )
        }
            
            
        
        return (
            <div style={{maxWidth: '75vw'}}>
                <h1>{this.state.json ? this.state.json.title : "LOADING SURVEY..."}</h1>
                <button style={{margin: '5px'}} onClick={() => this.loadSurveyData()}>Load Entry</button>
                <button style={{margin: '5px'}} onClick={() => this.clearSurvey()}>Clear Survey</button>
                <br/>
                {survey}
            </div>
        );
    }

}

export default Survey;