
var consumed = null;  
var surveyOutput='';


//when the study starts...
function initialize() {
    getTweet();         //import the first consumable
    getSurvey()         //create the survey
}
    
    
//function to pull in a new consumable.
function getTweet(){
    $('#tweet-box').empty() //clear the previous tweet if any
    //the getConsumables() function takes as input the class, set, number of consumables to pull in.
    //The class and set names are created in the "Manage Consumables" Tab of your research team.
    getConsumables("tweetDemo", 'set1', 1, function(data, err) {
      //and returns an array where the consumable object as the first item. 
      consumed = data[0];
      showTweet(consumed); //render the tweet
    });
}

//Render the tweet using Twitters nice viewer
function showTweet(tid){
    //tid is the tweet id - '1234567897654321'
    twttr.widgets.createTweet(
        tid, 
        document.getElementById('tweet-box')        //what div in the HTML to put the tweet in
    ); 
};

//response options for the question 2 dropdown
var emotions=["Don't know",'confused','sad','certain','happy','angry','energized'] 

//Constructor for the survey. Add new questions and then append their type to surveyOutput.
function getSurvey(){
    textbox('question1','What emotions does this tweet elicit for you?')
    dropdown('question2','What is the dominant emotion communicated in the tweet?',emotions)
    singleChoice('question3','If you saw this tweet in your timeline, how likely would you be to like this tweet?',['Not likely','Somewhat Likely','Very Likely'])
    textbox('question4','Other thoughts?')
    surveyOutput=["textbox","dropdown","singleChoice",'textbox']
}

//when someone clicks the submit button
function saveData(){
    //save data in Volunteer Science 
    saveSurvey();
    
    //tell Volunteer Science this person consumed this object from the class "consumableDemo" and set named "set1"
    //setConsumables("tweetDemo",'set1',consumed);
    
    //Get the next Tweet
    getTweet()
}

//save input from the survey
function saveSurvey(){
    output=[]
    output.push(consumed)                               //start with the tweet id itself
    for (i=0; i<=surveyOutput.length; i++){
        if (surveyOutput[i]=='textbox'){
            output.push(saveTextbox(i+1));              //if its a textbox, add the results from the saveTextbox function
        }else if (surveyOutput[i]=='dropdown'){
            output.push(saveDropdown(i+1));             //if its a dropdown, add the results from the saveDropdown function
        }else if (surveyOutput[i]=='singleChoice'){
            output.push(saveSingleChoice(i+1));         //if its a single choice, add the results from the saveSingleChoice function
        }
    }

    submit(output)                                      //save the data
    $.when($('#survey').empty()).then(getSurvey())      //when saving is done, delete the old survey and create a new one.
}




