import {
  db,
  collection,
  doc,
  getDoc
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

  } catch (error) {

    console.error(error);

  }

}

loadDashboard();
