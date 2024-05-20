function getFileName() {
    let el = document.querySelectorAll("[id^=check_file_][id$=_cpp]")[0];
    return el.id.split("_")[2] + ".cpp";
}

function getFilesNames() {
    let els = document.querySelectorAll("[id^=check_file_][id$=_cpp]");
    let names = [];
    for (let i = 0; i < els.length; i++) {
        names.push(els[i].id.split("_")[2] + ".cpp");
    }
    return names;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function goToNextLesson() {
    let lekcjaNextButton = document.getElementById("lekcja_next");
    if (lekcjaNextButton == null) {
        return;
    }
    lekcjaNextButton.click();
}

function getLessonId() {
    return window.location.href.split(":")[2];
}

function determineLessonTypes() {
    return new Promise((resolve, reject) => {
        waitForKeyElements("#toolbox-refresh", () => {
        let lessonTypes = []
        let activeLekcja = document.querySelectorAll("#lekcja-items > *.active");
        activeLekcja.forEach(function (element) {
            let lessonType = element.id.split("-")[1].slice("t_".length);
            lessonTypes.push(lessonType);
        });
        resolve(lessonTypes);
    });
    });
}

function getAnswer(id) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: `http://tlem.arturm.me/getLesson?id=${id}`,
            onload: function (response) {
                resolve(response);
            }
        })
    })
}