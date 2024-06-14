function choice(userChoice) {
    let PlayersChoiceElement = document.getElementById("PlayersChoice");
    PlayersChoiceElement.innerHTML = userChoice;

    let additionalOptions = document.getElementById("additionalOptions");
    let passengerCount = document.getElementById("passengerCount");

    additionalOptions.style.display = "block";

    if (userChoice === "Yes") {
        passengerCount.style.display = "block";
    } else {
        passengerCount.style.display = "none";
    }
}

function submitOptions(event) {
    event.preventDefault();
    
    let userChoice = document.getElementById("PlayersChoice").innerHTML;
    let numPassengers = userChoice === "Yes" ? document.getElementById("numPassengers").value : "N/A";
    let location = document.getElementById("locationSelect").value;

    let resultElement = document.getElementById("ResultMessage");

    let PCsChoiceElement = document.getElementById("PCsChoice");
    let PCsChoice = getRandomChoice();
    PCsChoiceElement.innerHTML = `車: ${PCsChoice.car}, 場所: ${PCsChoice.location}`;

    resultElement.innerHTML = determineResult(userChoice, numPassengers, location, PCsChoice);
}

function getRandomChoice() {
    const carChoices = ["Yes", "No"];
    const locationChoices = ["A", "B", "C", "D"];
    
    let carChoice = carChoices[Math.floor(Math.random() * carChoices.length)];
    let locationChoice = locationChoices[Math.floor(Math.random() * locationChoices.length)];
    
    return { car: carChoice, location: locationChoice };
}

function determineResult(userChoice, numPassengers, location, computerChoice) {
    let resultMsg = `ユーザー: 車 - ${userChoice}, 乗せられる人数 - ${numPassengers}, 場所 - ${location}`;
    let compMsg = `コンピュータ: 車 - ${computerChoice.car}, 場所 - ${computerChoice.location}`;

    if (userChoice === computerChoice.car && location === computerChoice.location) {
        resultMsg += "<br>結果: あいこ";
    } else {
        resultMsg += "<br>結果: 違う選択肢";
    }
    
    return resultMsg;
}