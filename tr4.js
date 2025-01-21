// ==UserScript==
// @name         Personalized JS Code
// @namespace    http://tampermonkey.net/
// @version      2025-01-21
// @description  Modify specific transaction amounts and date/time formats on the page for multiple cases
// @author       You
// @match        https://stake.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stake.com
// @grant        none
// @run-at       document-end
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

  function observeUrlChange(callback) {
    let lastUrl = location.href;
    const observer = new MutationObserver(() => {
      const currentUrl = location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        callback(currentUrl);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function onPageLoad() {
    if (location.pathname === "/transactions/withdrawals") {
      modifySpecificTransaction();

      const observer = new MutationObserver(() => {
        modifySpecificTransaction();
      });

      // Observe DOM changes
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  // Watch for URL changes to detect navigation
  observeUrlChange(() => {
    onPageLoad();
  });

  // Run the script on initial page load
  onPageLoad();
})();
