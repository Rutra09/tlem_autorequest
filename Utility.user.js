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
    let nextLessonid = handlers.menus.nextId;
    handlers.lekcja.load(nextLessonid);
}

function getLessonId() {
    return window.location.href.split(":")[2];
}

function determineLessonTypes() {
    return new Promise((resolve, reject) => {
        if (document.querySelectorAll("li[id^=lekcja-].active").length > 0) {
            let lessonTypes = [];
            let lessons = document.querySelectorAll("li[id^=lekcja-].active")
            lessons.forEach((lesson) => {
                let lessonType = lesson.id.split("_")[1];
                lessonTypes.push(lessonType);
            });
            resolve(lessonTypes);
            return;
        }
        waitForKeyElements("li[id^=lekcja-].active", function () {
            let lessonTypes = [];
            let lessons = document.querySelectorAll("li[id^=lekcja-].active")
            lessons.forEach((lesson) => {
                let lessonType = lesson.id.split("_")[1];
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

function fakeCounter(clicks, time) {
    handlers.lekcja.deltaKeys = clicks;
    handlers.lekcja.deltaClick = clicks*2;
    handlers.lekcja.deltaTime = time;
}
function addFakeCounter(clicks, time) {
    handlers.lekcja.deltaKeys += clicks;
    handlers.lekcja.deltaClick += clicks*2;
    handlers.lekcja.deltaTime += time;
}