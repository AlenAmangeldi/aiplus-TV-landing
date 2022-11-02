const newRanksChildren = document.getElementById("children");
const newRanksHeader = document.getElementById("new-ranks-icon");
const date = document.getElementById("date");
const emptyBlock = document.getElementById("empty");
const number = document.querySelector(":root");

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
let allStudents = [];

async function getData() {
  for (let i = 0; i < 7; i++) {
    let dates = new Date();
    dates.setDate(dates.getDate() - i);
    dates.setHours(-18);
    dates.setMinutes(0);
    dates.setSeconds(0);
    let ISODate = dates.toISOString().substring(0, 19);
    console.log(ISODate);
    await fetch(
      `https://aiplus.t8s.ru//Api/V2/GetStudents?Statuses=Занимается,Регистрация&authkey=VdqvXSXu%2Fq1DWiLefLBUihGMn7MHlvSP59HIHoHH7%2BLEtHB5dtznB6sqyJIPjH5w&extraFieldName=Дата+нового+ранга&extraFieldValue=${ISODate}`
    )
      .then((response) => response.json())
      .then((data) =>
        data.Students.forEach((student) => {
          const studentRank = student.ExtraFields.find(
            (el) => el.Name == "Рейтинг"
          ).Value;
          allStudents.push({ ...student, rank: studentRank });
        })
      );
  }
  delay();
}
getData();

function emptyBlockSet() {
  emptyBlock.innerHTML = `<p>Нет детей</p>`;
}

i = 0;
async function delay() {
  let students = allStudents.filter((student) => student.rank == rankList[i]);
  console.log(allStudents);
  // if (students.length == 0) {
  //   i++;
  //   delay();
  // }
  number.style.setProperty("--number", students.length);
  number.style.setProperty(
    "--animation-duration",
    students.length < 6 ? "18s" : students.length * 3 + "s"
  );
  await displayData(students, rankList[i]);
  setTimeout(
    () => {
      i++;
      if (rankList[i] !== undefined) {
        delay();
      } else {
        i = 0;
        delay();
      }
    },
    students.length < 6 ? 18500 : students.length * 3000
  );
}

function displayData(students, rank) {
  let html = "";
  let rankIcon = "";
  if (students) {
    // console.log(data);
    rankIcon += `<img src="./assets/${rank}.png" />
        <div class="new-ranks-title">Новые ранги</div>
        <div class="new-ranks-subtitle">${rank}</div>`;
    newRanksHeader.innerHTML = rankIcon;
    students.forEach((student) => {
      const studentRank = student.ExtraFields.find(
        (el) => el.Name == "Общий"
      ).Value;
      let studentImg = student.PhotoUrls
        ? "https://aiplus.t8s.ru/" + student.PhotoUrls[0]
        : "./assets/child.svg";
      // index = delaySet(index);
      html += `<div class="child" id="child">
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
  const childClass = document.getElementById("children");
  childClass.style["animation-duration"] = "10s";
  newRanksChildren.innerHTML = html;
}
