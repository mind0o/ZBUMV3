var tmpVarGeneralAsync;

var myState = -1; // 0 is normal -1 is not joined game -2 is trying to join
var testMode = true;
var majorGameState = -1;
var minorGameState = 0;
var tmpMinorState= 0;
var minorStateChanged = false;
var numberOfMasterColumnsToKeepTrackOf = 5;
var numberOfPlayerColumnsToKeepTrackOf = 5;
var myPlayerID = 0;
var actionToTake = 0;
var nnnn = "gggg";
var iSubmittedWhateverWasNeeded = false;
var gameJSURL;
var gameRow = 1;
var gameRowTmp = 1;
var niknameCodeSize = 70;

var currentNumberOfPlayersTemp = 0;
var maxNumberOfPlayersTemp = 0;


var language = "English";
var repeatGetVariablesSeconds =3;
var repeatMainActionSeconds =3.5;

var tmp1 = document.createElement("p");
tmp1.style = "font-size: "+niknameCodeSize +"px";
tmp1.innerHTML = "<b>Game Code</b>";

var gameIDInput = document.createElement("input");
gameIDInput.type = "text";
gameIDInput.style = "font-size: "+(niknameCodeSize+30) +"px;" + "text-align: center;border-style: solid;border-width: 10px;";
gameIDInput.maxLength = 3;
gameIDInput.size = 3;
gameIDInput.pattern="[^A-Z]+";
gameIDInput.oninput="if(this.value.length >= this.getAttribute('maxlength') return false";

var JSONInfo;

var usingLocal = false;

var externalScript;

var localPath = 'https://localhost:3000/ZBUMCommunicate/';
var globalPath = "https://zubairnodescripts.com/ZBUMCommunicate/";
var tmpPath = usingLocal ? localPath : globalPath;


var tmp2 = document.createElement("p");
tmp2.style = "font-size: "+niknameCodeSize +"px";
tmp2.innerHTML = "<b>Nickname</b>";

var myNameInput = document.createElement("input");
myNameInput.style = "font-size: "+niknameCodeSize +"px;"+ "text-align: center;border-style: solid;border-width: 10px;";
myNameInput.type = "text";
myNameInput.maxLength = 16;
myNameInput.size=14;
myNameInput.oninput="if(this.value.length >= this.getAttribute('maxlength') return false";



var lobbySumbitButton = document.createElement("Button");
lobbySumbitButton.innerHTML = "Join Game!";
lobbySumbitButton.style = "font-size: "+(niknameCodeSize+40) +"px";

var communicateVariableChangeGameData = "";
var communicateVariableChangeMasterData = "";

var communicateVariableChangeInput = "";
var communicateVariableChangeInfo = "";

var tmp3 = document.createElement("p");

var responseForUser = document.createElement("h2");
responseForUser.style = "font-size: "+niknameCodeSize +"px;";

