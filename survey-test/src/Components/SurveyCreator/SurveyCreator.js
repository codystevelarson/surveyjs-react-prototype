import React, { Component } from "react";
import * as SurveyKo from "survey-knockout";
import * as SurveyJSCreator from "survey-creator";
import "survey-creator/survey-creator.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

//import "icheck/skins/square/blue.css";
import "pretty-checkbox/dist/pretty-checkbox.css";

import * as widgets from "surveyjs-widgets";

// TO USE DEFAULT THEMES
SurveyJSCreator.StylesManager.applyTheme("stone");



// // CUSTOM CSS FOR SURVEY (UGLY LIME GREEN)
// var mainColor = "#7ff07f";
// var mainHoverColor = "#6fe06f";
// var textColor = "#4a4a4a";
// var headerColor = "#7ff07f";
// var headerBackgroundColor = "#4a4a4a";
// var bodyContainerBackgroundColor = "#f8f8f8";


// var defaultThemeColorsEditor = SurveyJSCreator
//     .StylesManager
//     .ThemeColors["default"];
// defaultThemeColorsEditor["$primary-color"] = mainColor;
// defaultThemeColorsEditor["$secondary-color"] = mainColor;
// defaultThemeColorsEditor["$primary-hover-color"] = mainHoverColor;
// defaultThemeColorsEditor["$primary-text-color"] = textColor;
// defaultThemeColorsEditor["$selection-border-color"] = mainColor;

// SurveyJSCreator
//     .StylesManager
//     .applyTheme();

//widgets.icheck(SurveyKo, $);
widgets.prettycheckbox(SurveyKo);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
//widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);

class SurveyCreator extends Component {
  formId = 0;
  surveyCreator;
  componentDidMount() {
    let options = { 
      showEmbededSurveyTab: false, // Provides embedding options for the form. Disable in production
      showTestSurveyTab: true, // Testable version of the form while creating
      showInvisibleElementsInTestSurveyTab: true, // Will show elements hidden by the logic properties
      showJSONEditorTab: true, // Shows JSON of form (great for debugging). Disable in production
      showLogicTab: false, 
      designerHeight: '900px',
      showState: true, // Displays status of survey "Modified, Saved, Saving..."
      // showPagesToolbox: false, // Disable pages
      // showPagesInTestSurveyTab: false, 
      // allowControlSurveyTitleVisibility: false,
      // questionTypes: ["text", "comment", "checkbox", "radiogroup", "dropdown", 'rating', 'boolean']
    };
    this.surveyCreator = new SurveyJSCreator.SurveyCreator(
      null,
      options
    );
    // Ensure unique question names
    // this.surveyCreator.ensureUniqueNames();

    // Filter toolbox items to only allowed items
    // Can run a console.log on this.surveyCreator.toolbox.itemNames and add or remove items in this.toolboxItems
    this.surveyCreator.toolbox.itemNames.forEach(item => {
      if (this.allowedToolboxItems.indexOf(item) === -1){
        this.surveyCreator.toolbox.removeItem(item);
      }
    });

    // Sets layout of toolbox & properties tabs
    this.surveyCreator.showToolbox = 'left';
    this.surveyCreator.showPropertyGrid = 'left';
    this.surveyCreator.leftContainerActiveItem("toolbox");
    // Declare the function to handle saving
    this.surveyCreator.saveSurveyFunc = this.saveSurvey;
    
    // Create a custom tabs
    this.surveyCreator.tabs().push({
      name: "faq-template",
      title: "FAQ",
      template: "faq-tab-survey-templates",
      action: () => {
          this.surveyCreator.makeNewViewActive("faq-template");
      },
      data: {},
    });
    this.surveyCreator.tabs().push({
      name: "help-template",
      title: "Help",
      template: "help-tab-survey-templates",
      action: () => {
          this.surveyCreator.makeNewViewActive("help-template");
      },
      data: {},
    });
    
    this.surveyCreator.render("surveyCreatorContainer");

    this.loadSurvey(this.formId);
    console.log(this.surveyCreator);

  }
  render() {
    return (<div>
      <script type="text/html" id="faq-tab-survey-templates">
        {/* Put custom custom tabs code here */}
        {`<div id="test">Custom FAQ page</div>`}
      </script>
      <script type="text/html" id="help-tab-survey-templates">
        {/* Put custom custom tabs code here */}
        {`<div id="test">Custom HELP page</div>`}
      </script>

      <div id="surveyCreatorContainer" style={{width:'100vw'}}/>
    </div>);
  }
  saveSurvey = () => {
    console.log("Creator:",this.surveyCreator);
    console.log("Data:",this.surveyCreator.text);

    // Save form to api endpoint here
    // updating a form use the edit form endpoint and use ID from this.formId

  };

  json = {
    title: "Survey Title&Logo demo",
    description: "Please take look at the survey title and logo. Test the settings on the right panel ->",
    logo: "https://surveyjs.io/favicon.ico",
    logoWidth: 60,
    logoHeight: 60,
    questions: [
      {
          name: "name",
          type: "text",
          title: "Please enter your name:",
          placeHolder: "Jon Snow",
          isRequired: true,
          custom: 99
      }, {
          name: "birthdate",
          type: "text",
          inputType: "date",
          title: "Your birthdate:",
          isRequired: true
      }, {
          name: "color",
          type: "text",
          inputType: "color",
          title: "Your favorite color:"
      }, {
          name: "email",
          type: "text",
          inputType: "email",
          title: "Your e-mail:",
          placeHolder: "jon.snow@nightwatch.org",
          isRequired: true,
          validators: [
              {
                  type: "email"
              }
          ]
      }
    ]
  };

  // Allowed toolbox items
  allowedToolboxItems = [
    'text',
    'checkbox',
    'radiogroup',
    'dropdown',
    'comment',
    'rating',
    'boolean',
    'datepicker'   
  ];

  loadSurvey = (id) => {
    if (id) {
      // Fetch form data from api

      // let form = ApiResponse;
      // this.surveyCreator.text = form.data;
    } else {
      let text = JSON.stringify(this.json);
      this.surveyCreator.text = text;
    }
    
  }
}

export default SurveyCreator;
