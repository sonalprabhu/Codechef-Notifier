
/* check the URL from details object
* if the url matches the required codechef url then
* extract the submission storageKeys from the url
* check if a request with that submission storageKeys is already present in your storage
* The above check is necessary because codechef repeatedly sends this
* request until the result is obtained.
* If the submission storageKeys is not present then save request and call the function made
* for fetching question info, fetching the result and notifying the user.
*/
chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
  var tokenValue;
  if (details.url.indexOf('solution_id') != -1) {
    chrome.storage.local.get(['solution_id'], (storageKeys) => {
      let submissionId = (details.url.split('?')[1]).split('=')[1];
      //If either localStorage doesn't have an entry or same submissionId is not present
      if ((Object.keys(storageKeys).length === 0 && storageKeys.constructor === Object) || storageKeys.solution_id != submissionId) {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
          if (details.requestHeaders[i].name === 'x-csrf-token') {
            tokenValue = details.requestHeaders[i].value;
            chrome.storage.local.set({ 'csrf-token': tokenValue });
          }
        }
        console.log(submissionId);
        chrome.storage.local.set({ 'solution_id': submissionId });
        setTimeout(function () { checkResult({ submissionId, csrf_token: tokenValue }) }, 3000);
      }
    })
  }


}, { urls: ["*://www.codechef.com/*"] },
  ["blocking", "requestHeaders"]);



//Clear localStorage before extension closes
function clearLocalStorage() {
  chrome.storage.local.clear(function () {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  })
}

function checkResult({ submissionId, csrf_token }) {

  $.ajax({

    url: `https://www.codechef.com/api/ide/submit?solution_id=${submissionId}`,

    dataType: "json",

    headers: { "x-csrf-token": csrf_token },

    success:
      function getProblemDetails(data) {
        if (data && data.result_code && data.result_code === 'accepted') {
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { sendProblemDetails: true }, function (response) {
              const { problemName, problemCode } = response;
              chrome.notifications.create({ title: "Results announced", message: `${problemName} : ${problemCode}`, iconUrl: "https://icon-library.net/images/retry-icon/retry-icon-20.jpg", type: "list" });
            });
          });
        }
      },

    error: function () { console.log('Error occured') }/* function to handle errors*/
  });
}

