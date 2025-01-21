// ==UserScript==
// @name         Personalized JS Code
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

  function modifySpecificTransaction() {
    const rows = document.querySelectorAll("tr");

    rows.forEach((row) => {
      const amountElement = row.querySelector(
        "td.table-cell-item div.row-wrap.right div.currency span.content span.weight-normal"
      );

      if (
        amountElement &&
        amountElement.textContent.trim() === "100.09999990"
      ) {
        amountElement.textContent = "0.0001100";

        const dateDiv = row.querySelector("div.col.header-stack");
        const statusSpan = row.querySelector("span.weight-semibold");

        if (dateDiv) {
          dateDiv.style.display = "flex";
          dateDiv.style.flexDirection = "column";
          dateDiv.style.gap = "5px";
          dateDiv.style.alignItems = "flex-start";

          dateDiv.innerHTML = `<span style="color: var(--white); font-weight: 600;">Confirmed</span><span>11:22 AM 12/22/2024</span>`;
        }

        if (statusSpan) {
          statusSpan.textContent = "Confirmed";
          statusSpan.style.color = "var(--white)";
          statusSpan.style.fontWeight = "600";
        }

        return;
      }
    });
  }

  window.addEventListener("load", () => {
    modifySpecificTransaction();
  });

  const observer = new MutationObserver(() => {
    modifySpecificTransaction();
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
