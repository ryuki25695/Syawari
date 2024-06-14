let currentGroup = null; // 現在のグループ情報を保持する変数

function createGroup(event) {
    event.preventDefault();

    let groupName = document.getElementById("groupName").value;
    let groupPassword = document.getElementById("groupPasswordCreate").value;

    // ここにグループ作成のロジックを追加する
    // 例えば、グループを作成してデータベースやローカルストレージに保存するなどの処理を行う
    // ここでは単純にグループ名を保存するだけとする
    currentGroup = groupName;

    // 表示を切り替える
    document.getElementById("createGroup").classList.add("hidden");
    document.getElementById("main").classList.remove("hidden");
}

function joinGroup(event) {
    event.preventDefault();

    let groupName = document.getElementById("groupNameJoin").value;
    let groupPassword = document.getElementById("groupPasswordJoin").value;

    // ここに既存グループへの参加のロジックを追加する
    // 例えば、グループが存在するか、パスワードが正しいかをチェックする処理を行う
    // ここでは単純にグループ名を保存するだけとする
    currentGroup = groupName;

    // 表示を切り替える
    document.getElementById("joinGroup").classList.add("hidden");
    document.getElementById("main").classList.remove("hidden");
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
        group: currentGroup,
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
        if (!(selection.group in userGroups)) {
            userGroups[selection.group] = [];
        }
        userGroups[selection.group].push(selection);
    });

    // マッチング結果を表示する
    Object.keys(userGroups).forEach((group) => {
        let groupSelections = userGroups[group];

        let groupHeader = document.createElement('li');
        groupHeader.textContent = `${group} の選択`;

        let groupList = document.createElement('ul');
        groupSelections.forEach((selection) => {
            let listItem = document.createElement('li');
            listItem.textContent = `ユーザー名: ${selection.name}, 乗せられる人数 - ${selection.passengers}, 場所 - ${selection.location}`;
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
        Object.keys(userGroups).forEach((group) => {
            if (selection.group === group) {
                matched = true;
            }
        });
        if (!matched) {
            let listItem