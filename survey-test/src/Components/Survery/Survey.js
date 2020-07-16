import React, {Component} from 'react';
import * as Sjs from 'survey-react';
 import "survey-react/survey.css";

class Survey extends Component {
    state = {
        json: {
            // "title": "Survey Title&Logo demo",
            // "description": "Please take look at the survey title and logo. Test the settings on the right panel ->",
            // "logo": "https://surveyjs.io/favicon.ico",
            // "logoWidth": 60,
            // "logoHeight": 60,
            "questions": [
                {
                    "name": "name",
                    "type": "text",
                    "title": "Please enter your name:",
                    "placeHolder": "Jon Snow",
                    "isRequired": true,
                    "custom": 99,
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
            ]
        },
        model: null
    }
    

     

    onComplete(survey, options){
        console.log("Survey", survey);
        console.log("Options", options);

        console.log("Data",survey.data);
    }

    componentDidMount(){
        let model = new Sjs.Model(this.state.json);
        console.log(model);
        this.setState({model: model});
        
        // fetch entry data here 
        // const entrydata = {name: "Cody", birthdate: "1989-08-07", color: "#2990ff", email: "test@test.com"};
        // this.model.data = entrydata;
    }

    loadSurvey() {
        const entrydata = {name: "Cody", birthdate: "1989-08-07", color: "#2990ff", email: "test@test.com"};
        console.log(this.state.json);
        let model = new Sjs.Model(this.state.json);
        model.data = entrydata;
        this.setState({model: model});
    }

    clearSurvey() {
        this.state.model.clear();
        // this.addIssueButtons();
        // let model = new Sjs.Model(this.state.json);
        // this.setState({model: model});    
    }

    qaValidator(s, options){
        console.log("s", s);
        console.log("options", options);
        let issues = ["name", "color"];

        if(issues.indexOf(options.name) !== -1) {
            options.error = "QA ISSUE HERE";
        }
    }

    addIssue(question) {
        alert("ADDING issue to " + question.propertyHash.name);  
        console.log(question);
    }

    viewIssue(question){
        alert("VIEWING issue to " + question.propertyHash.name);  
        console.log(question);
    }

    addIssueButtons() {
        let self = this;
        this.state.model.onAfterRenderQuestion.add((survey, options) => {
            //Add issues button
            let hasIssue = options.question.name === "name";
            let btns = [];
            let btn = document.createElement('button');
            btn.type = "button";
            btn.style.position = "absolute";
            btn.style.right = "0px";

            let hasIssueClass = hasIssue? "btn-danger" : "";
            btn.className = `issue-btn btn ${hasIssueClass}`; 
            btn.innerHTML = hasIssue ? "View Issue" : "Add Issue";
            
            var question = options.question;
            btn.onclick = function () {
                if(hasIssue){
                    self.viewIssue(question);
                } else {
                    self.addIssue(question);
                }
            }

            btns.push(btn);
            
            var header = options
                .htmlElement
                .querySelector("h5");
            var span = document.createElement("span");
            span.innerHTML = "  ";
            console.log(header.parentElement);
            header.parentElement.style.display = "flex";
            header.parentElement.style.flexFlow = "row";
            header.parentElement.append(span);
            
            btns.map(b => {
                return span.append(b);
            })
            
        });
    }

    render() {
        Sjs.FunctionFactory
        .Instance
        .register("qaValidator", this.qaValidator);

        let survey = this.state.model !== null ? <Sjs.Survey model={this.state.model} onComplete={() => this.onComplete()}/> : null;
        
        if(this.state.model){
            this.addIssueButtons();
            
        }
        
        return (
            <div style={{maxWidth: '75vw'}}>
                <h2>Survey</h2>
                <button onClick={() => this.loadSurvey()}>Load Survey</button>
                <button onClick={() => this.clearSurvey()}>Clear Survey</button>
                <br/>
                {survey}
            </div>
        );
    }

}

export default Survey;