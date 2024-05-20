// ==UserScript==
// @name         Tlem AutoRequest
// @namespace    http://tampermonkey.net/
// @version      1.2
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



function insertCodeSQL(code, callback) {
    code.split("").forEach(() => {
        fakeCounter(1, 1);
    });
    ace.edit("sql_cmd").setValue(code);
    ace.edit("sql_cmd").clearSelection();
    console.log(handlers.sql.cmd, handlers.lekcja)
    handlers.sql.process();
}

function handleSQL() {
    let id = getLessonId();
    getAnswer(id).then((response) => {
        if(response.responseText == "No data for this lesson") 
            alert("W bazie nie ma jeszcze tego zadania. \nSkontatkuj się z Arturkiem albo Gąską. (Ewentualnie zadzwoń do J.P.)");
         else {
            let data = JSON.parse(response.responseText);
            let code = data["plik.cpp"]
            insertCodeSQL(code);
            setTimeout(() => {
                makeNextLessonSQL();
            }, 100);
        }
    });
}

function makeNextLessonSQL() {
    goToNextLesson();
    handleSQL();
}

function lessonDetector() {
    console.log("Lesson Detector");
    determineLessonTypes().then((lessonTypes) => {
        console.log(lessonTypes);
        switch (lessonTypes[0]) {
            case "code":

                break;
            case "sql":
                handleSQL();
                break;
            default:
        }
    });
}


function init() {
    lessonDetector();
}

(function () {
    'use strict';
    init();
})();