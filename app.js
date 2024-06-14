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

    // 車を持っているユーザーごとにグループ化する
    let userGroups = {};
    selections.forEach((selection) => {
        if (!(selection.car in userGroups)) {
            userGroups[selection.car] = [];
        }
        userGroups[selection.car].push(selection);
    });

    // マッチング結果を表示する
    Object.keys(userGroups).forEach((car) => {
        let group = userGroups[car];

        let groupHeader = document.createElement('li');
        groupHeader.textContent = `${group[0].name} の選択`;

        let groupList = document.createElement('ul');
        group.forEach((selection) => {
            let listItem = document.createElement('li');
            listItem.textContent = `乗せられる人数 - ${selection.passengers}, 場所 - ${selection.location}`;
            groupList.appendChild(listItem);
        });

        matchList.appendChild(groupHeader);
        matchList.appendChild(groupList);
    });

    // マッチングしていない人の表示
    let unmatchedList = document.createElement('ul');
    let unmatchedExist = false;
    selections.forEach((selection) => {
        let matched = false;
        Object.keys(userGroups).forEach((car) => {
            if (selection.car === car) {
                matched = true;
            }
        });
        if (!matched) {
            let listItem = document.createElement('li');
            listItem.textContent = `${selection.name} の選択は他のユーザーとのマッチングが見つかりませんでした。`;
            unmatchedList.appendChild(listItem);
            unmatchedExist = true;
        }
    });

    if (unmatchedExist) {
        let unmatchedHeader = document.createElement('li');
        unmatchedHeader.textContent = "マッチングしていない人";

        matchList.appendChild(unmatchedHeader);
        matchList.appendChild(unmatchedList);
    }
}

function accessGroup(event) {
    event.preventDefault();

    let password = document.getElementById("groupPassword").value;
    // ここにパスワードに基づくグループへのアクセスロジックを追加する
    // 例: 特定のパスワードで特定のグループのページにリダイレクトする処理など
}
