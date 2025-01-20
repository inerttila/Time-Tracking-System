// ==UserScript==
// @name         Modify Specific Date and Time
// @namespace    http://tampermonkey.net/
// @version      2025-01-20
// @description  Change the displayed date and time for a specific transaction on the page
// @author       You
// @match        https://stake.com/transactions/withdrawals
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stake.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Function to modify the specific date and time
  function modifySpecificDateTime() {
    // Locate all the div elements with the specific class
    const dateElements = document.querySelectorAll(
      "div.col.header-stack.svelte-1lie80u"
    );

    // Loop through the divs to find the specific date and time
    for (const element of dateElements) {
      // Check if the element contains the exact date and time
      if (element.textContent.includes("6:33 PM 1/19/2025")) {
        // Update the date and time to the new value
        element.textContent = element.textContent.replace(
          "6:33 PM 1/19/2025",
          "11:29 AM 12/22/2024"
        );
        console.log("Date and time updated to 11:29 AM 12/22/2024");
        break; // Stop after modifying the first match
      }
    }
  }

  // Run the modification function after the page has fully loaded
  window.addEventListener("load", modifySpecificDateTime);

  // Use a MutationObserver to handle dynamic content updates
  const observer = new MutationObserver(() => {
    modifySpecificDateTime();
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
