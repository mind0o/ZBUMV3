var express = require('express');
const cors = require('cors');
var gg = 1;
const app = express();
const fs = require('fs');
const { json, raw } = require('express');


var takenGameIDs = [];

var gameInfosJSON = [];




console.log("hiii");



app.use(cors())

app.get('/', function (req, res) {
  doShit();
  gg++;
  res.send('hello world\nnono\nyes\n' + gg); //replace with your data here
});
app.get('/ass', function (req, res) {
  res.send('hello ass\nnono\nyes\n'); //replace with your data here
});

app.get('/ZBUMCommunicate/gimmeAllTakenIDs', function (req, res) {
  // res.send("dd");
  let tmp = " \n";
  for (let index = 0; index < takenGameIDs.length; index++) {
    tmp = tmp + takenGameIDs[index] + "\n";
  }

  res.send(tmp); //replace with your data here
});



app.get('/ZBUMCommunicate/deleteGame/:gameID', function (req, res) {
  // res.send("dd");
  let indexWeWant = takenGameIDs.indexOf(req.params.gameID.toUpperCase());
  if (indexWeWant == -1) {
    res.send("not found");
    return;
  }
  takenGameIDs.splice(indexWeWant, 1);
  takenGameIDs.splice(gameInfosJSON, 1);

  res.send("done"); //replace with your data here
});

app.get('/ZBUMCommunicate/gimmeJSON/:gameID', function (req, res) {
  // res.send("dd");
  let indexWeWant = takenGameIDs.indexOf(req.params.gameID.toUpperCase());
  if (indexWeWant == -1) {
    res.send("not found");
    return;
  }


  let rawdata = gameInfosJSON[indexWeWant];
  res.send(JSON.stringify(rawdata)); //replace with your data here
});

app.get('/ZBUMCommunicate/updateGameStates/:gameID/:major/:minor', function (req, res) {
  // res.send("dd");
  let indexWeWant = takenGameIDs.indexOf(req.params.gameID.toUpperCase());
  if (indexWeWant == -1) {
    res.send("not found");
    return;
  }


  let JSONtmp = gameInfosJSON[indexWeWant];

  if (req.params.major != 'ZZZ') JSONtmp.majorGameState = parseInt(req.params.major);
  if (req.params.minor != 'ZZZ') JSONtmp.minorGameState = parseInt(req.params.minor);
  gameInfosJSON[indexWeWant] = JSONtmp;
  res.send("done"); //replace with your data here
});

app.get('/ZBUMCommunicate/updateGameData/:gameID/:dataInMyFormat', function (req, res) {
  // res.send("dd");
  let indexWeWant = takenGameIDs.indexOf(req.params.gameID.toUpperCase());
  if (indexWeWant == -1) {
    res.send("not found");
    return;
  }


  let JSONtmp = gameInfosJSON[indexWeWant];
  let lines = req.params.dataInMyFormat.split("UUU");
  for (let index = 0; index < lines.length; index++) {
    if (lines[index] == 'ZZZ') continue;
    JSONtmp.gameData[index] = lines[index];
  }
  gameInfosJSON[indexWeWant] = JSONtmp;
  res.send("done"); //replace with your data here
});

app.get('/ZBUMCommunicate/changeJSURL/:gameID/:tokenID', function (req, res) {
  // res.send("dd");
  let indexWeWant = takenGameIDs.indexOf(req.params.gameID.toUpperCase());
  if (indexWeWant == -1) {
    res.send("not found");
    return;
  }

  let JSONtmp = gameInfosJSON[indexWeWant];

  JSONtmp.javascriptFileURL = 'https://drive.google.com/uc?export=view&id=' + req.params.tokenID;
  gameInfosJSON[indexWeWant] = JSONtmp;
  res.send("done"); //replace with your data here
});

app.get('/ZBUMCommunicate/updateMasterData/:gameID/:dataInMyFormat', function (req, res) {
  // res.send("dd");
  let indexWeWant = takenGameIDs.indexOf(req.params.gameID.toUpperCase());
  if (indexWeWant == -1) {
    res.send("not found");
    return;
  }

  let JSONtmp = gameInfosJSON[indexWeWant];
  let lines = req.params.dataInMyFormat.split("UUU");
  for (let index = 0; index < lines.length; index++) {
    if (lines[index] == 'ZZZ') continue;
    JSONtmp.masterData[index] = lines[index];
  }
  gameInfosJSON[indexWeWant] = JSONtmp;
  res.send("done"); //replace with your data here
});


app.get('/ZBUMCommunicate/incrementCurrentNumberOfPlayers/:gameID/:num', function (req, res) {
  // res.send("dd");
  let indexWeWant = takenGameIDs.indexOf(req.params.gameID.toUpperCase());
  if (indexWeWant == -1) {
    res.send("not found");
    return;
  }

  let JSONtmp = gameInfosJSON[indexWeWant];
  JSONtmp.currentNumberOfPlayers = parseInt(JSONtmp.currentNumberOfPlayers) + parseInt(req.params.num);
  gameInfosJSON[indexWeWant] = JSONtmp;
  res.send("done"); //replace with your data here
});

app.get('/ZBUMCommunicate/changePlayerName/:gameID/:whichPlayer/:whatName/:setActive/:increment', function (req, res) {
  // res.send("dd");
  let indexWeWant = takenGameIDs.indexOf(req.params.gameID.toUpperCase());
  if (indexWeWant == -1) {
    res.send("not found");
    return;
  }

  let JSONtmp = gameInfosJSON[indexWeWant];
  if (req.params.whichPlayer == "all") {
    for (let index = 0; index < JSONtmp.maxNumberOfPlayers; index++) {
      if (req.params.whatName != "ZZZ")
        JSONtmp.Players[index].hisName = req.params.whatName;
      if (req.params.setActive != "ZZZ") {
        if (req.params.setActive == "true") JSONtmp.Players[index].Active = true; else JSONtmp.Players[index].Active = false;
      }

    }
  } else {
    if (req.params.whatName != "ZZZ")
      JSONtmp.Players[req.params.whichPlayer].hisName = req.params.whatName;

    if (req.params.setActive != "ZZZ") {
      if (req.params.setActive == "true") JSONtmp.Players[req.params.whichPlayer].Active = true; else JSONtmp.Players[req.params.whichPlayer].Active = false;
    }
  }

  if (req.params.increment == "true") JSONtmp.currentNumberOfPlayers = (parseInt(JSONtmp.currentNumberOfPlayers) + 1);

  gameInfosJSON[indexWeWant] = JSONtmp;
  res.send("done"); //replace with your data here
});

app.get('/ZBUMCommunicate/setActionsToPlayers/:gameID/:whichPlayer/:whichAction', function (req, res) {
  // res.send("dd");
  let indexWeWant = takenGameIDs.indexOf(req.params.gameID.toUpperCase());
  if (indexWeWant == -1) {
    res.send("not found");
    return;
  }

  let JSONtmp = gameInfosJSON[indexWeWant];
  if (req.params.whichPlayer == "all") {
    for (let index = 0; index < JSONtmp.maxNumberOfPlayers; index++) {
      JSONtmp.Players[index].actionToTake = req.params.whichAction;

    }
  } else {
    JSONtmp.Players[req.params.whichPlayer].actionToTake = req.params.whichAction;
  }
  gameInfosJSON[indexWeWant] = JSONtmp;
  res.send("done"); //replace with your data here
});

app.get('/ZBUMCommunicate/setPlayerStates/:gameID/:whichPlayer/:whichState', function (req, res) {
  // res.send("dd");
  let indexWeWant = takenGameIDs.indexOf(req.params.gameID.toUpperCase());
  if (indexWeWant == -1) {
    res.send("not found");
    return;
  }

  let JSONtmp = gameInfosJSON[indexWeWant];
  if (req.params.whichPlayer == "all") {
    for (let index = 0; index < JSONtmp.maxNumberOfPlayers; index++) {
      JSONtmp.Players[index].playerState = req.params.whichState;

    }
  } else {
    JSONtmp.Players[req.params.whichPlayer].playerState = req.params.whichState;
  }
  gameInfosJSON[indexWeWant] = JSONtmp;
  res.send("done"); //replace with your data here
});


app.get('/ZBUMCommunicate/updatePlayerInfo/:gameID/:whichPlayer/:dataInMyFormat', function (req, res) {
  // res.send("dd");
  let indexWeWant = takenGameIDs.indexOf(req.params.gameID.toUpperCase());
  if (indexWeWant == -1) {
    res.send("not found");
    return;
  }

  let JSONtmp = gameInfosJSON[indexWeWant];
  let lines = req.params.dataInMyFormat.split("UUU");

  if (req.params.whichPlayer == "all") {
    for (let index = 0; index < JSONtmp.maxNumberOfPlayers; index++) {
      for (let index2 = 0; index2 < lines.length; index2++) {
        if (lines[index2] == 'ZZZ') continue;
        JSONtmp.Players[index].playerInfo[index2] = lines[index2];
      }

    }
  } else {

    for (let index2 = 0; index2 < lines.length; index2++) {
      if (lines[index2] == 'ZZZ') continue;
      JSONtmp.Players[req.params.whichPlayer].playerInfo[index2] = lines[index2];
    }

  }
  gameInfosJSON[indexWeWant] = JSONtmp;
  res.send("done"); //replace with your data here
});


app.get('/ZBUMCommunicate/updatePlayerInput/:gameID/:whichPlayer/:dataInMyFormat', function (req, res) {
  // res.send("dd");
  let indexWeWant = takenGameIDs.indexOf(req.params.gameID.toUpperCase());
  if (indexWeWant == -1) {
    res.send("not found");
    return;
  }

  let JSONtmp = gameInfosJSON[indexWeWant];
  let lines = req.params.dataInMyFormat.split("UUU");

  if (req.params.whichPlayer == "all") {
    for (let index = 0; index < JSONtmp.maxNumberOfPlayers; index++) {
      for (let index2 = 0; index2 < lines.length; index2++) {
        if (lines[index2] == 'ZZZ') continue;
        JSONtmp.Players[index].playerInput[index2] = lines[index2];
      }

    }
  } else {

    for (let index2 = 0; index2 < lines.length; index2++) {
      if (lines[index2] == 'ZZZ') continue;
      JSONtmp.Players[req.params.whichPlayer].playerInput[index2] = lines[index2];
    }

  }
  gameInfosJSON[indexWeWant] = JSONtmp;
  res.send("done"); //replace with your data here
});


app.get('/ZBUMCommunicate/makeGame/:gameID/:lang/:maxPlayers/:javascriptFileURL/:gameDataNum/:masterDataNum/:playerInfoNum/:playerInputNum', function (req, res) {
  // res.send("dd");
  //console.log("gg0");
  if (takenGameIDs.indexOf(req.params.gameID.toUpperCase()) != -1) {
    res.send("taken");
    return;
  }
  // console.log("gg1");
  takenGameIDs.push(req.params.gameID.toUpperCase());
  let tmp = " ";
  tmp += '{"gameID":"' + req.params.gameID.toUpperCase() + '",' + '"language":"' + req.params.lang + '","currentNumberOfPlayers": 0,"maxNumberOfPlayers":' + req.params.maxPlayers + ',"majorGameState":-1,"minorGameState":0,"javascriptFileURL":"' + req.params.javascriptFileURL + '",';
  tmp += '"gameData":[" "';
  //console.log("gg2");
  for (let index = 1; index < req.params.gameDataNum; index++) {
    tmp += '," "';

  }
  tmp += '],"masterData":[" "';
  for (let index = 1; index < req.params.masterDataNum; index++) {
    tmp += '," "';

  }
  tmp += '],';
  tmp += '"Players":[';
  for (let index = 0; index < req.params.maxPlayers; index++) {
    tmp += '{"doesExist": false,"hisName":"AAA","areYouAlive":false,"Active":false,"ipAddress":"aaa","actionToTake":0,"playerState":0,"playerInfo":[" "';
    for (let index = 1; index < req.params.playerInfoNum; index++) {
      tmp += '," "';

    }
    tmp += '],"playerInput":[" "';
    for (let index = 1; index < req.params.playerInputNum; index++) {
      tmp += '," "';

    }
    tmp += '],';

    tmp += '"switchToThisPlayer":0}'
    if (index != req.params.maxPlayers - 1) tmp += ',';
  }
  tmp += ']}';

  gameInfosJSON.push(JSON.parse(tmp));

  res.send("done"); //replace with your data here
});


function doShit() {
  fs.writeFileSync('jjj.json', tmp);
}


var student = {
  name: 'Mike',
  age: 23,
  gender: 'Male',
  department: 'English',
  car: 'Honda'
};

var data = JSON.stringify(student);


app.listen(3000);
