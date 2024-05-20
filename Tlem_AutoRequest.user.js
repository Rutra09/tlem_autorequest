// ==UserScript==
// @name         Tlem AutoRequest
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       ArturM
// @match        https://edu.t-lem.com/
// @updateURL    https://github.com/Rutra09/tlem_autoprompt/raw/master/Tlem_AutoPrompt2.user.js
// @downloadURL  https://github.com/Rutra09/tlem_autoprompt/raw/master/Tlem_AutoPrompt2.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=t-lem.com
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_xmlhttpRequest
// @grant        GM_cookie
// ==/UserScript==

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

function getLessonId() {
    return window.location.href.split(":")[2];
}

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

function insertCodeSQL(code, file) {
    waitForKeyElements("#sql_cmd", function () {
        setTimeout(() => {
            console.log(code);
            ace.edit("sql_cmd").setValue(code);
            ace.edit("sql_cmd").clearSelection();
            handlers.sql.process()   
            goToNextLesson();    
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

function goToNextLesson() {
    let lekcjaNextButton = document.getElementById("lekcja_next");
    if (lekcjaNextButton == null) {
        return;
    }
    lekcjaNextButton.click();
    setTimeout(() =>  {
        submitAnswer()
        console.log("Next lesson");
    }, 500);
    
}

function lessonDetector() {
    waitForKeyElements("#lekcja_next", () => submitAnswer(), true);
}

function init() {
    lessonDetector();
}

(function () {
    'use strict';
    init();
})();