// ==UserScript==
// @name         leetcode_test_case_helper
// @description  get test cases of all WA verdict
// @match        https://leetcode.com/problems/*/
// @include      https://leetcode.com/problems/*/discuss
// @icon         https://www.google.com/s2/favicons?domain=leetcode.com
// @run-at       document-end
// ==/UserScript==



function handler(event) {
    position = document.querySelector('.css-5wdlwo-TabViewHeader > div:nth-child(1)')
    createButton()
    observer.disconnect()
}

function createButton() {
    btn = document.createElement('div')
    btn.innerHTML = '<button class="shuffle-handler__3Gzu css-6iyx43">Get Test Case</button>'
    btn.onclick = getTestCase
    position.appendChild(btn)
}

function createTextArea() {
    text = document.createElement('div')
    text.innerHTML = '<textarea class="myTestCase" style="width:100px;height:30px"></textarea>'
    position.appendChild(text)
}

function getTestCase() {
    textArea = document.querySelector('.myTestCase')
    if (!textArea) {
        createTextArea()
    } else {
        textArea.value = ''
    }
    testCaseSet.clear()
    wrongAnwers = document.querySelectorAll('.error__B-Nx')
    for (wa of wrongAnwers) {
        url = wa.href
        getInput(url)
    }
}

function getInput(url) {
    fetch(url)
        .then(response => {
            return response.text()
        })
        .then(html => {
            i = html.indexOf("input : ")
            j = html.indexOf("expected_output :")
            tc = html.substring(i + 9, j - 9).replaceAll('\\u0022', '"').replaceAll('\\u000A', '\r\n')
            if (!testCaseSet.has(tc)) {
                textArea = document.querySelector('.myTestCase')

                textArea.value += tc + '\r\n'
                // console.log(tc)
                testCaseSet.add(tc)
            }
        })
}

testCaseSet = new Set()
observer = new MutationObserver(handler)
observer.observe(document, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
})





