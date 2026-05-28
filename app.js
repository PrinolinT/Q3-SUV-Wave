const screens = {

  screen1:
    document.getElementById("screen1"),

  screen2:
    document.getElementById("screen2"),

  screen3:
    document.getElementById("screen3"),

  screen4:
    document.getElementById("screen4"),

  screen5:
    document.getElementById("screen5")

};

function showScreen(screenId) {

  Object.values(screens).forEach(screen => {

    screen.classList.add("hidden");

  });

  screens[screenId]
    .classList.remove("hidden");

}

/* SCREEN 1 */

document
  .getElementById("screen1Btn")
  .addEventListener("click", () => {

    const name =
  document.getElementById("name").value;

const storename =
  document.getElementById("storename").value;

const accnumber =
  document.getElementById("accnumber").value;

const phonenumber =
  document.getElementById("phonenumber").value;

const salesRep =
  document.getElementById("salesRep").value;

    if (
  !name ||
  !storename ||
  !accnumber ||
  !phonenumber ||
  !salesRep ||
!document.getElementById("termsCheck").checked
) {

      alert(
        "Please complete all fields."
      );

      return;

    }

    showScreen("screen2");

  });

/* SCREEN 2 */

document
  .getElementById("screen2Btn")
  .addEventListener("click", () => {

    // CORRECT ANSWERS
    const answers = {

      q1: "A/T and M/T",
      q2: "Mud self-cleaning",
      q3: "S-Block",
      q4: "Caterpillar Block",
      q5: "Water evacuation channels",
      q6: "Randomised block sizing"

    };

    let totalCorrect = 0;

    let totalWrong = 0;

    let wrongQuestions = [];

    // RESET ERRORS
    document
      .querySelectorAll(".question-group")
      .forEach(group => {

        group.classList.remove(
          "question-error"
        );

      });

    document
      .getElementById("quizError")
      .classList.add("hidden");

    // VALIDATE QUESTIONS
    Object.keys(answers).forEach(
      question => {

        const selected =
          document.querySelector(
            `input[name="${question}"]:checked`
          );

        if (
          selected &&
          selected.value === answers[question]
        ) {

          totalCorrect++;

        } else {

          totalWrong++;

          wrongQuestions.push(question);

          document
            .querySelector(
              `input[name="${question}"]`
            )
            .closest(".question-group")
            .classList.add(
              "question-error"
            );

        }

      }
    );

    // FINAL RESULT
if (totalWrong === 0) {

  showScreen("screen3");

} else {

  // SHOW ERROR MESSAGE
  document
    .getElementById("quizError")
    .classList.remove("hidden");

  // CHANGE BUTTON TO CLOSE SESSION
  const screen2Btn =
    document.getElementById("screen2Btn");

  screen2Btn.innerHTML =
    "CLOSE SESSION";

  // REMOVE OLD CLICK EVENTS
  screen2Btn.innerHTML =
  "CLOSE SESSION";

screen2Btn.onclick = () => {

  screen2Btn.innerHTML =
    "SUBMIT ANSWERS";

  resetSession();

};

}

  });

/* SCREEN 3 */

const spinBtn =
  document.getElementById("spinBtn");

const wheel =
  document.getElementById("spinWheel");

let spinning = false;

const segmentAngles = {

  airfryer: 75,
  luckydraw: 225,
  coolerbox: 135,
  braaiset: 255

};

function testSpin(outcome) {

  if (spinning) return;

  spinning = true;

  const wheel =
    document.getElementById("spinWheel");

  const baseRotation = 3600;

  const targetAngle =
    segmentAngles[outcome];

  const pointerOffset = 12;

const rotation =
  baseRotation + targetAngle + pointerOffset;

  wheel.style.transform =
  `rotate(${rotation - 60}deg)`;

  setTimeout(() => {

    spinning = false;

  }, 4000);

}

spinBtn.addEventListener(
  "click",
  () => {

    if (spinning) return;

    spinning = true;

    const resultTitle =
      document.getElementById("resultTitle");

    const resultText =
      document.getElementById("resultText");

    const prizeImage =
      document.getElementById("prizeImage");

    const random = Math.random();

let outcome;

if (random < 0.05) {

  outcome = "airfryer";

} else if (random < 0.10) {

  outcome = "coolerbox";

} else if (random < 0.15) {

  outcome = "braaiset";

} else {

  outcome = "luckydraw";

}

const baseRotation = 3600;

const targetAngle =
  segmentAngles[outcome];

const rotation =
  baseRotation + targetAngle;

    // SPIN ANIMATION
    wheel.style.transform =
      `rotate(${rotation}deg)`;

    // WAIT FOR SPIN TO FINISH
    setTimeout(() => {

      if (outcome === "airfryer") {

  resultTitle.innerHTML =
    "🎉 Congratulations!";

  resultText.innerHTML =
    "You won an Air Fryer instantly.<br><br>You have also been entered into the grand prize lucky draw.";

  prizeImage.src =
    "assets/airfryer.jpg";

  prizeImage.classList.remove(
    "hidden"
  );

} else if (outcome === "coolerbox") {

  resultTitle.innerHTML =
    "🎉 Congratulations!";

  resultText.innerHTML =
    "You won a Cooler Box instantly.<br><br>You have also been entered into the grand prize lucky draw.";

  prizeImage.classList.add(
    "hidden"
  );

} else if (outcome === "braaiset") {

  resultTitle.innerHTML =
    "🎉 Congratulations!";

  resultText.innerHTML =
    "You won a Braai Set instantly.<br><br>You have also been entered into the grand prize lucky draw.";

  prizeImage.classList.add(
    "hidden"
  );

} else {

  resultTitle.innerHTML =
    "You're In The Lucky Draw!";

  resultText.innerHTML =
    "You did not win an instant prize today, but you have been entered into the grand prize lucky draw.";

  prizeImage.classList.add(
    "hidden"
  );

}

      spinning = false;

      showScreen("screen4");

    }, 4000);

  }
);

/* SCREEN 4 */

document
  .getElementById("screen4Btn")
  .addEventListener("click", () => {

    showScreen("screen5");

  });

/* TERMS MODAL */

const termsModal =
  document.getElementById("termsModal");

document
  .getElementById("openTerms")
  .addEventListener("click", (e) => {

    e.preventDefault();

    e.stopPropagation();

    termsModal.classList.add("active");

  });

document
  .getElementById("acceptTerms")
  .addEventListener("click", () => {

    document.getElementById(
      "termsCheck"
    ).checked = true;

    termsModal.classList.remove(
      "active"
    );

  });

/* RESET SESSION FUNCTION */

function resetSession() {

  // CLEAR CUSTOMER DETAILS
  document.getElementById("name").value = "";
  document.getElementById("storename").value = "";
document.getElementById("accnumber").value = "";
document.getElementById("phonenumber").value = "";
document.getElementById("salesRep").value = "";

  // RESET TERMS
  document.getElementById("termsCheck").checked = false;

  // CLEAR ALL RADIO BUTTONS
  document
    .querySelectorAll('input[type="radio"]')
    .forEach(radio => {

      radio.checked = false;

    });

  // REMOVE QUESTION ERROR STATES
  document
    .querySelectorAll(".question-group")
    .forEach(group => {

      group.classList.remove(
        "question-error"
      );

    });

  // HIDE QUIZ ERROR
  document
    .getElementById("quizError")
    .classList.add("hidden");

  // RESET WHEEL
  document.getElementById("spinWheel")
    .style.transform = "rotate(-60deg)";

  // RESET RESULTS
  document.getElementById("resultTitle")
    .innerHTML = "";

  document.getElementById("resultText")
    .innerHTML = "";

  document.getElementById("prizeImage")
    .classList.add("hidden");

  // RETURN TO SCREEN 1
  showScreen("screen1");

}

/* CLOSE SESSION BUTTON */

const closeSessionBtn =
  document.getElementById(
    "closeSessionBtn"
  );

closeSessionBtn.onclick = () => {

  resetSession();

};
