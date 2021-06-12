chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    /*
        * query DOM to get problem name and code
        * user sendResponse method to send info back to the sender
        * as a JSON object.
    */
    const { problemName, problemCode } = getProblemDetailsFromDOM();

    if (request && request.sendProblemDetails === true) {
        sendResponse({ problemCode, problemName });
    }

});

function getProblemDetailsFromDOM() {
    var breadcrumb = document.getElementsByClassName("breadcrumb")[0].children;
    var problemName = breadcrumb[breadcrumb.length - 1].text;
    var problemCode = document.getElementsByClassName("run-details-info")[0].children[1].children[1].textContent;
    return { problemName, problemCode };
}