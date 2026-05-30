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

    // MOST MISSED QUESTIONS

const questionCounts = {

  q1: 0,
  q2: 0,
  q3: 0,
  q4: 0,
  q5: 0,
  q6: 0

};

gameResultsSnapshot.forEach(doc => {

  const data = doc.data();

  if (
    data.incorrectQuestions &&
    Array.isArray(
      data.incorrectQuestions
    )
  ) {

    data.incorrectQuestions
      .forEach(question => {

        if (
          questionCounts[
            question
          ] !== undefined
        ) {

          questionCounts[
            question
          ]++;

        }

      });

  }

});

const questionsBody =
  document.querySelector(
    "#questionsTable tbody"
  );

questionsBody.innerHTML = "";

Object.entries(
  questionCounts
).forEach(
  ([question, count]) => {

    questionsBody.innerHTML += `
      <tr>
        <td>${question}</td>
        <td>${count}</td>
      </tr>
    `;

  }
);

  } catch (error) {

    console.error(
      "Dashboard Error:",
      error
    );

  }

}

loadDashboard();

document
  .getElementById("exportExcel")
  .addEventListener(
    "click",
    async () => {

      const workbook =
        XLSX.utils.book_new();

      // PARTICIPANTS

      const participantsSnapshot =
        await getDocs(
          collection(
            db,
            "participants"
          )
        );

      const participants =
        participantsSnapshot.docs.map(
          doc => doc.data()
        );

      const participantsSheet =
        XLSX.utils.json_to_sheet(
          participants
        );

      XLSX.utils.book_append_sheet(
        workbook,
        participantsSheet,
        "Participants"
      );

      // GAME RESULTS

      const gameResultsSnapshot =
        await getDocs(
          collection(
            db,
            "gameResults"
          )
        );

      const gameResults =
        gameResultsSnapshot.docs.map(
          doc => doc.data()
        );

      const winners =
        gameResults.filter(
          result =>
            result.outcome &&
            result.outcome !==
              "luckydraw"
        );

      const failedQuiz =
        gameResults.filter(
          result =>
            result.passedQuiz === false
        );

      const luckyDraw =
        gameResults.filter(
          result =>
            result.enteredLuckyDraw === true
        );

      // WINNERS

      const winnersSheet =
        XLSX.utils.json_to_sheet(
          winners
        );

      XLSX.utils.book_append_sheet(
        workbook,
        winnersSheet,
        "Winners"
      );

      // LUCKY DRAW

      const luckyDrawSheet =
        XLSX.utils.json_to_sheet(
          luckyDraw
        );

      XLSX.utils.book_append_sheet(
        workbook,
        luckyDrawSheet,
        "Lucky Draw"
      );

      // FAILED QUIZ

      const failedSheet =
        XLSX.utils.json_to_sheet(
          failedQuiz
        );

      XLSX.utils.book_append_sheet(
        workbook,
        failedSheet,
        "Failed Quiz"
      );

      // MISSED QUESTIONS

      const questionCounts = {

        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        q6: 0

      };

      gameResults.forEach(
        result => {

          if (
            result.incorrectQuestions
          ) {

            result
              .incorrectQuestions
              .forEach(
                question => {

                  questionCounts[
                    question
                  ]++;

                }
              );

          }

        }
      );

      const questionsSummary =
        Object.entries(
          questionCounts
        ).map(
          ([question, count]) => ({

            Question:
              question,

            IncorrectCount:
              count

          })
        );

      const questionsSheet =
        XLSX.utils.json_to_sheet(
          questionsSummary
        );

      XLSX.utils.book_append_sheet(
        workbook,
        questionsSheet,
        "Question Summary"
      );

      const now =
        new Date();

      const timestamp =
        now
          .toISOString()
          .replace(/[:]/g, "-")
          .split(".")[0];

      XLSX.writeFile(
        workbook,
        `Q3_SUV_Wave_Report_${timestamp}.xlsx`
      );

    }
  );
