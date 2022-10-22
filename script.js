const newRanksChildren = document.getElementById("children");
const newRanksHeader = document.getElementById("new-ranks-icon");
const date = document.getElementById("date");
const emptyBlock = document.getElementById("empty");

const rankList = [
  "Мастер (Master)",
  "Грандмастер (Grandmaster)",
  "Профессор (Professor)",
  "Мегамозг (Megamind)",
  "Босс (AIBoss)",
  "Легенда I (Legend I)",
  "Легенда II (Legend II)",
  "Легенда III (Legend III)",
];

function displayData(data, rank) {
  let html = "";
  let rankIcon = "";
  if (data.Students) {
    // console.log(data);
    rankIcon += `<img src="./assets/${rank}.png" />
        <div class="new-ranks-title">Новые ранги</div>
        <div class="new-ranks-subtitle">${rank}</div>`;
    newRanksHeader.innerHTML = rankIcon;
    data.Students.forEach((student, index) => {
      const studentRank = student.ExtraFields.find(
        (el) => el.Name == "Общий"
      ).Value;
      let studentImg = student.PhotoUrls
        ? "https://aiplus.t8s.ru/" + student.PhotoUrls[0]
        : "./assets/child.svg";
      index = delaySet(index);
      html += `<div class="child" style="--delay:${index};">
                <div class="child-img">
                    <img src="${studentImg}">
                </div>
                <div class="child-title">
                    ${student.FirstName} ${student.LastName}
                    <div class="child-subtitle">
                      <img src="./assets/star.svg">
                      ${studentRank}
                    </div>
                </div>
		          </div>`;
    });
  }
  newRanksChildren.innerHTML = html;
}

function delaySet(index) {
  switch (index) {
    case 0:
      return (index = -1);
    case 1:
      return (index = 0);
    case 2:
      return (index = 1);
    default:
      return (index = 2);
  }
}

function emptyBlockSet() {
  emptyBlock.innerHTML = `<p>Нет детей</p>`;
}

// let ranksData = [];
// let ISODate = new Date().toISOString().substring(0, 10);
let dates = new Date();
dates.setDate(dates.getDate() - 1);
let ISODate = dates.toISOString().substring(0, 10);
console.log(ISODate);

async function dataHandler() {
  // for (let i in 7) {
  //   await fetch(
  //     `https://aiplus.t8s.ru//Api/V2/GetStudents?Statuses=Занимается&authkey=VdqvXSXu%2Fq1DWiLefLBUihGMn7MHlvSP59HIHoHH7%2BLEtHB5dtznB6sqyJIPjH5w&extraFieldName=Дата+нового+ранга&extraFieldValue=07.10.2022&take=10`
  //   );
  // }
}

// // timerHandler();
i = 0;
async function delay() {
  // let date = new Date();
  // date.setDate(date.getDate() - 1);
  // let ISODate = date.toISOString().substring(0, 10);
  await fetch(
    `https://aiplus.t8s.ru//Api/V2/GetStudents?Statuses=Занимается&authkey=VdqvXSXu%2Fq1DWiLefLBUihGMn7MHlvSP59HIHoHH7%2BLEtHB5dtznB6sqyJIPjH5w&extraFieldName=Рейтинг&extraFieldValue=${rankList[i]}&extraFieldName=Дата+нового+ранга&extraFieldValue=07.10.2022&take=5`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.Students.length > 0) {
        console.log(rankList[i]);
        console.log(data);
        displayData(data, rankList[i]);
        setTimeout(() => {
          i++;
          if (rankList[i] !== undefined) {
            delay();
          } else {
            i = 0;
            delay();
          }
        }, data.Students.length * 3000);
      } else {
        emptyBlockSet();
      }
    });
}

delay();
