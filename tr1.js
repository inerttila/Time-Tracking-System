// ==UserScript==
// @name         Modify Transaction Amount and Date/Time (Multiple Cases)
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

  function modifySpecificAmount() {
    const tableCells = document.querySelectorAll("td.table-cell-item");

    for (const cell of tableCells) {
      const amountElement = cell.querySelector(
        "div.row-wrap.right div.col div.currency span.content > span.weight-normal.line-height-default.align-left.size-default.text-size-default.variant-subtle.numeric.with-icon-space.is-truncate.svelte-17v69ua"
      );

      if (
        amountElement &&
        amountElement.textContent.trim() === "9008.99999099"
      ) {
        amountElement.textContent = "100.099999900";
        break;
      }
    }
  }

  function modifySpecificDateTime() {
    const dateElements = document.querySelectorAll(
      "td.table-cell-item.svelte-1lie80u"
    );

    for (const element of dateElements) {
      const span = element.querySelector("span.weight-semibold");
      const div = element.querySelector("div.col.header-stack.svelte-1lie80u");

      if (div && div.textContent.includes("10:21 AM 1/20/2025")) {
        if (span) {
          span.textContent = "Confirmed";
          span.style.color = "var(--white)";
          span.style.fontWeight = "600";
        }

        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.gap = "5px";
        div.style.alignItems = "flex-start";

        div.innerHTML = `<span style="color: var(--white); font-weight: 600;">Confirmed</span><span>${"5:32 PM 12/23/2024"}</span>`;
        break;
      }
    }
  }

  function applyModifications() {
    modifySpecificAmount();
    modifySpecificDateTime();
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
      applyModifications();

      const observer = new MutationObserver(() => {
        applyModifications();
      });

      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  observeUrlChange(() => {
    onPageLoad();
  });

  onPageLoad();
})();
