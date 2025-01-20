// ==UserScript==
// @name         Modify Specific Transaction Amount
// @namespace    http://tampermonkey.net/
// @version      2025-01-17
// @description  Change the displayed amount for a specific transaction on the page
// @author       You
// @match        https://stake.com/transactions/withdrawals
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stake.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Function to modify the specific transaction amount
  function modifySpecificAmount() {
    // Locate all table cell items
    const tableCells = document.querySelectorAll("td.table-cell-item");

    // Loop through the cells to find the specific amount
    for (const cell of tableCells) {
      const amountElement = cell.querySelector(
        "div.row-wrap.right div.col div.currency span.content > span.weight-normal.line-height-default.align-left.size-default.text-size-default.variant-subtle.numeric.with-icon-space.is-truncate.svelte-17v69ua"
      );

      if (
        amountElement &&
        amountElement.textContent.trim() === "100.09999990"
      ) {
        // Update the amount to the new value
        amountElement.textContent = "0.0001100";
        console.log("Transaction amount updated to 0.0001100");
        break; // Stop after modifying the first match
      }
    }
  }

  // Run the modification function after the page has fully loaded
  window.addEventListener("load", modifySpecificAmount);

  // Use a MutationObserver to handle dynamic content updates
  const observer = new MutationObserver(() => {
    modifySpecificAmount();
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
