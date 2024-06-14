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
    
    let userName = document.getElementById("userName").value;
    let userChoice = document.getElementById("PlayersChoice").innerHTML;
    let numPassengers = userChoice === "Yes" ? document.getElementById("numPassengers").value : "N/A";
    let location = document.getElementById("locationSelect").value;

    // ユーザーの選択と名前をローカルストレージに保存
    let userSelection = {
        name: userName,
        car: userChoice,
        passengers: numPassengers,
        location: location
    };
    saveUserSelection(userSelection);

    // マッチング結果を表示
    displayMatches();
}

function saveUserSelection(selection) {
    let selections = JSON.parse(localStorage.getItem('selections')) || [];
    selections.push(selection);
    localStorage.setItem('selections', JSON.stringify(selections));
}

function displayMatches() {
    let selections = JSON.parse(localStorage.getItem('selections')) || [];
    let matchList = document.getElementById("matchList");
    matchList.innerHTML = '';

    selections.forEach((selection, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `ユーザー${index + 1} (${selection.name}): 車 - ${selection.car}, 乗せられる人数 - ${selection.passengers}, 場所 - ${selection.location}`;
        matchList.appendChild(listItem);
    });

    let userSelection = selections[selections.length - 1];
    let matchFound = false;

    selections.forEach((selection, index) => {
        if (index < selections.length - 1 && userSelection.location === selection.location) {
            let listItem = document.createElement('li');
            listItem.textContent = `マッチング: ${userSelection.name} と ${selection.name} が場所 ${userSelection.location} でマッチしました`;
            matchList.appendChild(listItem);
            matchFound = true;
        }
    });

    if (!matchFound) {
        let listItem = document.createElement('li');
        listItem.textContent = `${userSelection.name} の選択は他のユーザーとのマッチングが見つかりませんでした。`;
        matchList.appendChild(listItem);
    }
}

// ページ読み込み時にマッチング結果を表示
window.onload = displayMatches;