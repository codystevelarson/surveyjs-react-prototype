import React, {Component} from 'react';
import * as Sjs from 'survey-react';
import "survey-react/survey.css";

class Survey extends Component {
    json = {
        "title": "Survey Title&Logo demo",
        "description": "Please take look at the survey title and logo. Test the settings on the right panel ->",
        "logo": "https://surveyjs.io/favicon.ico",
        "logoWidth": 60,
        "logoHeight": 60,
        "questions": [
            {
                "name": "name",
                "type": "text",
                "title": "Please enter your name:",
                "placeHolder": "Jon Snow",
                "isRequired": true,
                "custom": 99
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
    };
    model = new Sjs.Model(this.json);

    onComplete(survey, options){
        console.log("Survey", survey);
        console.log("Options", options);

        console.log("Data",survey.data);
    }


    render() {
        return (
            <div style={{maxWidth: '600px'}}>
                <h2>Survey</h2>
                <Sjs.Survey model={this.model} onComplete={this.onComplete}/>
            </div>
        );
    }

}

export default Survey;