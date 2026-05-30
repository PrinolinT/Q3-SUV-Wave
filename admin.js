import {
  db,
  collection,
  getDocs,
  getDoc,
  doc
}
from "./firebase.js";

async function loadDashboard() {

  try {

    // PARTICIPANTS

    const participantsSnapshot =
      await getDocs(
        collection(
          db,
          "participants"
        )
      );

    document.getElementById(
      "participantsCount"
    ).innerText =
      participantsSnapshot.size;

    // GAME RESULTS

    const gameResultsSnapshot =
      await getDocs(
        collection(
          db,
          "gameResults"
        )
      );

    let passedQuiz = 0;
    let failedQuiz = 0;
    let luckyDraw = 0;

    gameResultsSnapshot.forEach(doc => {

      const data = doc.data();

      if (data.passedQuiz) {

        passedQuiz++;

      } else {

        failedQuiz++;

      }

      if (data.enteredLuckyDraw) {

        luckyDraw++;

      }

    });

    document.getElementById(
      "passedCount"
    ).innerText =
      passedQuiz;

    document.getElementById(
      "failedCount"
    ).innerText =
      failedQuiz;

    document.getElementById(
      "luckyDrawCount"
    ).innerText =
      luckyDraw;

    // INVENTORY

    const inventorySnapshot =
      await getDoc(
        doc(
          db,
          "prizePool",
          "inventory"
        )
      );

    const inventory =
      inventorySnapshot.data();

    document.getElementById(
      "flashlightCount"
    ).innerText =
      inventory.flashlight;

    document.getElementById(
      "capCount"
    ).innerText =
      inventory.cap;

    document.getElementById(
      "jacketCount"
    ).innerText =
      inventory.jacket;

    // WINNERS TABLE

const winnersBody =
  document.querySelector(
    "#winnersTable tbody"
  );

winnersBody.innerHTML = "";

for (
  const resultDoc
  of gameResultsSnapshot.docs
) {

  const result =
    resultDoc.data();

  if (
    result.outcome &&
    result.outcome !==
      "luckydraw"
  ) {

    const participantDoc =
      await getDoc(

        doc(
          db,
          "participants",
          result.participantId
        )

      );

    if (
      participantDoc.exists()
    ) {

      const participant =
        participantDoc.data();

      winnersBody.innerHTML += `
        <tr>
          <td>${participant.name}</td>
          <td>${participant.storeName}</td>
          <td>${result.outcome}</td>
        </tr>
      `;

    }

  }

}

  } catch (error) {

    console.error(
      "Dashboard Error:",
      error
    );

  }

}

loadDashboard();
