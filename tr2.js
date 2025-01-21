// ==UserScript==
// @name         Modify Transaction Amount and Date/Time (Multiple Cases)
// @namespace    http://tampermonkey.net/
// @version      2025-01-21
// @description  Modify specific transaction amounts and date/time formats on the page for multiple cases
// @author       You
// @match        https://stake.com/transactions/withdrawals
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stake.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Function to modify the specific transaction amount
  function modifySpecificAmount() {
    const tableCells = document.querySelectorAll("td.table-cell-item");

    for (const cell of tableCells) {
      const amountElement = cell.querySelector(
        "div.row-wrap.right div.col div.currency span.content > span.weight-normal.line-height-default.align-left.size-default.text-size-default.variant-subtle.numeric.with-icon-space.is-truncate.svelte-17v69ua"
      );

      if (
        amountElement &&
        amountElement.textContent.trim() === "500.49999950"
      ) {
        amountElement.textContent = "0.4000000";
        break;
      }
    }
  }

  // Function to modify the specific date and time
  function modifySpecificDateTime() {
    const dateElements = document.querySelectorAll(
      "td.table-cell-item.svelte-1lie80u"
    );

    for (const element of dateElements) {
      const span = element.querySelector("span.weight-semibold");
      const div = element.querySelector("div.col.header-stack.svelte-1lie80u");

      if (div && div.textContent.includes("6:33 PM 1/19/2025")) {
        if (span) {
          span.textContent = "Confirmed";
          span.style.color = "var(--white)"; // Add the white color to "Confirmed"
          span.style.fontWeight = "600"; // Add font weight to "Confirmed"
        }

        div.style.display = "flex";
        div.style.flexDirection = "column"; // Ensure it is in column layout
        div.style.gap = "5px"; // Controlled gap between lines (adjust as needed)
        div.style.alignItems = "flex-start"; // Align text to the left

        div.innerHTML = `<span style="color: var(--white); font-weight: 600;">Confirmed</span><span>${"11:29 AM 12/22/2024"}</span>`;
        break;
      }
    }
  }

  // Run the modification functions after the page has fully loaded
  window.addEventListener("load", () => {
    modifySpecificAmount();
    modifySpecificDateTime();
  });

  // Use a MutationObserver to handle dynamic content updates
  const observer = new MutationObserver(() => {
    modifySpecificAmount();
    modifySpecificDateTime();
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
