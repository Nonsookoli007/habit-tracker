let habits = [];
let completedHabits = 0;

document.getElementById("addHabitBtn").addEventListener("click", addHabit);

function addHabit() {
    const habitInput = document.getElementById("habitInput");
    const habitText = habitInput.value.trim();

    console.log("Add habit triggered:", habitText);  // Log input value

    if (habitText) {
        habits.push({
            text: habitText,
            completed: false,
            streak: 0
        });
        habitInput.value = "";
        console.log("Habits array:", habits);  // Log current state of habits array
        renderHabits();
        updateSummary();
    }
}

function renderHabits() {
    const habitList = document.getElementById("habitList");
    habitList.innerHTML = "";  // Clear the habit list
    console.log("Rendering habits...");

    habits.forEach((habit, index) => {
        const habitDiv = document.createElement("div");
        habitDiv.classList.add("habit");

        if (habit.completed) {
            habitDiv.classList.add("completed");
        }

        const habitText = document.createElement("span");
        // habitText.innerText = `${habit.text} function (Streak: ${ habit, streak }, days)`
        habitText.innerHTML= `${habit.text} (Streak: ${habit.streak} days)` 

        const completeBtn = document.createElement("button");
        completeBtn.innerText = habit.completed ? "Undo" : "Complete";
        completeBtn.addEventListener("click", () => toggleComplete(index));

        habitDiv.appendChild(habitText);
        habitDiv.appendChild(completeBtn);

        habitList.appendChild(habitDiv);
    });
}

function toggleComplete(index) {
    console.log("Toggling complete for habit at index:", index);
    habits[index].completed = !habits[index].completed;
    
    if (habits[index].completed) {
        habits[index].streak += 1;
        completedHabits++;
    } else {
        completedHabits--;
    }

    renderHabits();
    updateSummary();
}

function updateSummary() {
    const totalHabits = habits.length;
    const completionRate = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

    console.log("Updating summary. Total:", totalHabits, "Completed:", completedHabits, "Completion rate:", completionRate);
    
    document.getElementById("totalHabits").innerText = totalHabits;
    document.getElementById("completedHabits").innerText = completedHabits;
    // document.getElementById("completionRate").innerText = completionRate + "%";
    document.getElementById("completionRate").innerText = completionRate;
}