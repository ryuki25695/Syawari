function accessGroup(event) {
    event.preventDefault();

    let password = document.getElementById("groupPassword").value;
    // ここにパスワードに基づくグループへのアクセスロジックを追加する
    // 例えば、パスワードが正しい場合は次のページに移動するなどの処理を行う

    // 仮のロジックとして、パスワードが "examplePassword" の場合に進むとする
    if (password === "examplePassword") {
        // パスワードが一致したら次のページを表示する
        document.getElementById("groupAccess").classList.add("hidden");
        document.getElementById("main").classList.remove("hidden");
    } else {
        alert("パスワードが正しくありません。");
    }
}

function choice(userChoice) {
    let PlayersChoiceElement = document.getElementById("PlayersChoice");
    PlayersChoiceElement.textContent = `ユーザー名: ${document.getElementById("userName").value}, 回答: ${userChoice}`;

    let additionalOptions = document.getElementById("additionalOptions");
    additionalOptions.classList.remove("hidden");

    if (userChoice === "Yes") {
        document.getElementById("passengerCount").classList.remove("hidden");
    } else {
        document.getElementById("passengerCount").classList.add("hidden");
    }
}

function submitOptions(event) {
    event.preventDefault();
    
    let userChoice = document.getElementById("PlayersChoice").textContent;
    let numPassengers = userChoice.includes("Yes") ? document.getElementById("numPassengers").value : "N/A";
    let location = document.getElementById("locationSelect").value;

    // ユーザーの選択をローカルストレージに保存
    let userSelection = {
        name: document.getElementById("userName").value,
        car: userChoice.includes("Yes") ? "Yes" : "No",
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

    // マッチングしていない人がいる場合の表示
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