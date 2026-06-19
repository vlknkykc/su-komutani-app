const today = new Date().toLocaleDateString("tr-TR");

let data = JSON.parse(localStorage.getItem("suKomutani")) || {
    date: today,
    water: 0,
    protein: 0,
    calories: 0,
    workout: false,
    weight: "",
    waist: "",
    history: []
};

if (data.date !== today) {

    data.history.unshift({
        date: data.date,
        water: data.water,
        protein: data.protein,
        calories: data.calories
    });

    if (data.history.length > 30) {
        data.history.pop();
    }

    data.date = today;
    data.water = 0;
    data.protein = 0;
    data.calories = 0;
    data.workout = false;
}

function saveData() {
    localStorage.setItem(
        "suKomutani",
        JSON.stringify(data)
    );
}

function render() {

    document.getElementById("todayDate")
    .innerText = data.date;

    document.getElementById("waterValue")
    .innerText =
    data.water + " / 4000 ml";

    document.getElementById("waterBar")
    .style.width =
    Math.min(
        (data.water / 4000) * 100,
        100
    ) + "%";

    document.getElementById("proteinValue")
    .innerText = data.protein;

    document.getElementById("calorieValue")
    .innerText = data.calories;

    document.getElementById("weightText")
    .innerText =
    data.weight
    ? "Son kilo: " + data.weight + " kg"
    : "Kilo girilmedi";

    document.getElementById("waistText")
    .innerText =
    data.waist
    ? "Son bel: " + data.waist + " cm"
    : "Bel ölçüsü girilmedi";

    document.getElementById("workoutStatus")
    .innerHTML =
    data.workout
    ? '<span class="success">Yapıldı ✅</span>'
    : '<span class="warning">Bekleniyor</span>';

    let historyHTML = "";

    data.history.forEach(day => {

        historyHTML += `
        <div>
        📅 ${day.date}<br>
        💧 ${day.water} ml |
        🍗 ${day.protein} g |
        🔥 ${day.calories} kcal
        <hr>
        </div>
        `;
    });

    document.getElementById("historyBox")
    .innerHTML =
    historyHTML ||
    "Henüz kayıt yok";
}

function addWater(amount) {

    data.water += amount;

    saveData();
    render();
}

function addProtein() {

    const value =
    Number(
        document.getElementById(
            "proteinInput"
        ).value
    );

    if (!value) return;

    data.protein += value;

    document.getElementById(
        "proteinInput"
    ).value = "";

    saveData();
    render();

    if (data.protein >= 130) {
        alert(
        "🎉 Protein hedefi tamamlandı!"
        );
    }
}

function addCalories() {

    const value =
    Number(
        document.getElementById(
            "calorieInput"
        ).value
    );

    if (!value) return;

    data.calories += value;

    document.getElementById(
        "calorieInput"
    ).value = "";

    saveData();
    render();

    if (data.calories > 2000) {

        alert(
        "⚠️ 2000 kcal sınırını geçtin!"
        );
    }
}

function saveWeight() {

    data.weight =
    document.getElementById(
        "weightInput"
    ).value;

    saveData();
    render();
}

function saveWaist() {

    data.waist =
    document.getElementById(
        "waistInput"
    ).value;

    saveData();
    render();
}

function workoutDone() {

    data.workout = true;

    saveData();
    render();
}

render();
