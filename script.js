let gender = 'male';
let goal = 'gain';
let activity = 'active';

function setGender(newGender) {
    gender = newGender;
    updateButtonStates();
}

function setGoal(newGoal) {
    goal = newGoal;
    updateButtonStates();
}

function setActivity(newActivity) {
    activity = newActivity;
    updateButtonStates();
}

function updateButtonStates() {
    document.querySelectorAll('.btn-group').forEach(group => {
        group.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = group.querySelector(`[onclick*="${gender}"], [onclick*="${goal}"], [onclick*="${activity}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    });
}

function updateAge(value) {
    document.getElementById('age-value').textContent = value;
}

function updateHeight(value) {
    document.getElementById('height-value').textContent = value;
}

function updateWeight(value) {
    document.getElementById('weight-value').textContent = value;
}

function calculateMacros() {
    const age = parseInt(document.getElementById('age-slider').value);
    const height = parseInt(document.getElementById('height-slider').value);
    const weight = parseInt(document.getElementById('weight-slider').value);

    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let tdee;
    switch(activity) {
        case 'sedentary':
            tdee = bmr * 1.2;
            break;
        case 'moderate':
            tdee = bmr * 1.55;
            break;
        case 'active':
            tdee = bmr * 1.725;
            break;
    }

    let calories;
    switch(goal) {
        case 'lose':
            calories = tdee - 500;
            break;
        case 'maintain':
            calories = tdee;
            break;
        case 'gain':
            calories = tdee + 500;
            break;
    }

    const protein = Math.round((calories * 0.35) / 4);
    const carbs = Math.round((calories * 0.40) / 4);
    const fat = Math.round((calories * 0.25) / 9);

    document.getElementById('total-calories').textContent = Math.round(calories);
    document.getElementById('protein-value').textContent = `${protein}g`;
    document.getElementById('carbs-value').textContent = `${carbs}g`;
    document.getElementById('fat-value').textContent = `${fat}g`;

    document.getElementById('results').style.display = 'block';

    const ctx = document.getElementById('formula-chart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Karbohidrat', 'Protein', 'Lemak'],
            datasets: [{
                data: [40, 35, 25],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        },
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Rasio Makro'
            }
        }
    });
}