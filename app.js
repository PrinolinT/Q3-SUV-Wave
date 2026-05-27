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

    const email =
      document.getElementById("email").value;

    const phone =
      document.getElementById("phone").value;

    const termsAccepted =
      document.getElementById("termsCheck").checked;

    if (
      !name ||
      !email ||
      !phone ||
      !termsAccepted
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

      document
        .getElementById("quizError")
        .classList.remove("hidden");

      console.log({

        totalCorrect,

        totalWrong,

        wrongQuestions

      });

    }

  });

/* SCREEN 3 */

const spinBtn =
  document.getElementById("spinBtn");

const wheel =
  document.getElementById("spinWheel");

let spinning = false;

spinBtn.addEventListener(
  "click",
  () => {

    if (spinning) return;

    spinning = true;

    const winner =
      Math.random() < 0.3;

    const resultTitle =
      document.getElementById("resultTitle");

    const resultText =
      document.getElementById("resultText");

    const prizeImage =
      document.getElementById("prizeImage");

    // RANDOM SPIN ANGLE
    const rotation =
      3600 + Math.floor(Math.random() * 360);

    // SPIN ANIMATION
    wheel.style.transform =
      `rotate(${rotation}deg)`;

    // WAIT FOR SPIN TO FINISH
    setTimeout(() => {

      if (winner) {

        resultTitle.innerHTML =
          "🎉 Congratulations!";

        resultText.innerHTML =
          "You won an Air Fryer.";

        prizeImage.src =
          "assets/airfryer.jpg";

        prizeImage.classList.remove(
          "hidden"
        );

      } else {

        resultTitle.innerHTML =
          "You're In The Lucky Draw!";

        resultText.innerHTML =
          "You did not win an instant prize, but have been entered into our lucky draw.";

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
  .getElementById("closeTerms")
  .addEventListener("click", () => {

    termsModal.classList.remove("active");

  });

/* CLOSE SESSION */

document
  .getElementById("closeSessionBtn")
  .addEventListener("click", () => {

    // CLEAR FORM FIELDS
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    document.getElementById("q1").value = "";
    document.getElementById("q2").value = "";
    document.getElementById("q3").value = "";
    document.getElementById("q4").value = "";
    document.getElementById("q5").value = "";
    document.getElementById("q6").value = "";

    // RESET TERMS
    document.getElementById("termsCheck").checked = false;

    // RESET WHEEL ROTATION
    document.getElementById("spinWheel")
      .style.transform = "rotate(0deg)";

    // RESET RESULT CONTENT
    document.getElementById("resultTitle")
      .innerHTML = "";

    document.getElementById("resultText")
      .innerHTML = "";

    document.getElementById("prizeImage")
      .classList.add("hidden");

    // RETURN TO HOME SCREEN
    showScreen("screen1");

  });
