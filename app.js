console.log("JS LOADED");

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

    const q1 =
      document.getElementById("q1")
      .value
      .toLowerCase()
      .trim();

    const q2 =
      document.getElementById("q2")
      .value
      .trim();

    if (
      q1 === "blue" &&
      q2 === "4"
    ) {

      showScreen("screen3");

    } else {

      alert(
        "Incorrect answers."
      );

    }

  });

/* SCREEN 3 */

document
  .getElementById("spinBtn")
  .addEventListener("click", () => {

    const winner =
      Math.random() < 0.3;

    const resultTitle =
      document.getElementById("resultTitle");

    const resultText =
      document.getElementById("resultText");

    const prizeImage =
      document.getElementById("prizeImage");

    if (winner) {

      resultTitle.innerHTML =
        "🎉 Congratulations!";

      resultText.innerHTML =
        "You won an Air Fryer.";

      prizeImage.src =
        "assets/airfryer.jpg";

      prizeImage.classList.remove("hidden");

    } else {

      resultTitle.innerHTML =
        "You're In The Lucky Draw!";

      resultText.innerHTML =
        "You did not win an instant prize, but have been entered into our lucky draw.";

      prizeImage.classList.add("hidden");

    }

    showScreen("screen4");

  });

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
