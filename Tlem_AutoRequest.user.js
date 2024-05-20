// ==UserScript==
// @name         Tlem AutoRequest
// @namespace    http://tampermonkey.net/
// @version      1.1b
// @description  try to take over the world!
// @author       ArturM
// @match        https://edu.t-lem.com/
// @updateURL    https://raw.githubusercontent.com/Rutra09/tlem_autorequest/main/Tlem_AutoRequest.user.js
// @downloadURL  https://raw.githubusercontent.com/Rutra09/tlem_autorequest/main/Tlem_AutoRequest.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=t-lem.com
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://raw.githubusercontent.com/Rutra09/tlem_autorequest/main/Utility.user.js
// @grant        GM_xmlhttpRequest
// @grant        GM_cookie
// ==/UserScript==


function insertCodeSQL(code) {
    waitForKeyElements("#sql_cmd", function () {
        setTimeout(() => {
            console.log(code);
            ace.edit("sql_cmd").setValue(code);
            ace.edit("sql_cmd").clearSelection();
            console.log(handlers.sql.cmd, handlers.lekcja)
            handlers.sql.process();
        }, 250);
    }, true);
}

function submitAnswer() {
    getAnswer(getLessonId()).then((response) => {
        console.log(response.responseText);
        if(response.responseText == "No data for this lesson") {
            alert("W bazie nie ma jeszcze tego zadania. \nSkontatkuj się z Arturkiem albo Gąską. (Ewentualnie zadzwoń do J.P.)")
            return;
        }
        let data = JSON.parse(response.responseText);
        let code = data["plik.cpp"]
        insertCodeSQL(code);
    });
}

function handleSQL() {
    let id = getLessonId();
    getAnswer(id).then((response) => {
        if(response.responseText == "No data for this lesson") {
            alert("W bazie nie ma jeszcze tego zadania. \nSkontatkuj się z Arturkiem albo Gąską. (Ewentualnie zadzwoń do J.P.)")
            return;
        }
        let data = JSON.parse(response.responseText);
        let code = data["plik.cpp"]
        insertCodeSQL(code);
        goToNextLesson();
    });
}


function lessonDetector() {
    waitForKeyElements("#lekcja-items", () => {
        determineLessonTypes().then((lessonTypes) => {
            switch (lessonTypes[0]) {
                case "code":
                    break;
                case "sql":

                    submitAnswer();
                    break;
                default:
                    alert("Nieznany typ lekcji");
            }
        });
    });
}

function init() {
    lessonDetector();
}

(function () {
    'use strict';
    init();
})();