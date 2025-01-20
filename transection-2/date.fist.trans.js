// ==UserScript==
// @name         Modify Specific Date and Time
// @namespace    http://tampermonkey.net/
// @version      2025-01-20
// @description  Modify the time and date format
// @author       You
// @match        https://stake.com/transactions/withdrawals
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stake.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Function to modify the specific date and time
  function modifySpecificDateTime() {
    // Locate all the td elements with the specific class
    const dateElements = document.querySelectorAll(
      "td.table-cell-item.svelte-1lie80u"
    );

    // Loop through the elements to find the specific date and time
    for (const element of dateElements) {
      const span = element.querySelector("span.weight-semibold");
      const div = element.querySelector("div.col.header-stack.svelte-1lie80u");

      // Check if the element contains the exact date and time
      if (div && div.textContent.includes("10:06 AM 1/14/2025")) {
        // Ensure the "Confirmed" text stays intact
        if (span) {
          span.textContent = "Confirmed";
          span.style.color = "var(--white)"; // Add the white color to "Confirmed"
          span.style.fontWeight = "600"; // Add font weight to "Confirmed"
        }

        // Apply the necessary flexbox style to break the content into lines
        div.style.display = "flex";
        div.style.flexDirection = "column"; // Ensure it is in column layout
        div.style.gap = "5px"; // Controlled gap between lines (adjust as needed)
        div.style.alignItems = "flex-start"; // Align text to the left

        // Update the date/time text with the new value
        if (div) {
          div.innerHTML = `<span style="color: var(--white); font-weight: 600;">Confirmed</span><span>${"11:29 AM 12/22/2024"}</span>`; // Add color and font-weight to Confirmed text
        }

        console.log("Date and time updated to 11:24 AM 12/22/2024");
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
