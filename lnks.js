// ==UserScript==
// @name         Modify Transaction Links Based on Time (SPA Compatible)
// @namespace    http://tampermonkey.net/
// @version      2025-01-21
// @description  Modify transaction links based on specific times dynamically on SPAs like Stake.com.
// @author       You
// @match        https://stake.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stake.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  function modifyTransactionLinks() {
    const tableRows = document.querySelectorAll("tr");

    for (const row of tableRows) {
      const dateElement = row.querySelector(
        "td.table-cell-item div.row-wrap div.col.header-stack span:nth-child(2)"
      );

      if (dateElement) {
        const transactionTime = dateElement.textContent.trim();

        if (transactionTime === "11:29 AM 12/22/2024") {
          replaceLink(
            row,
            "https://www.blockchain.com/explorer/transactions/btc/7c1f3479736d20007b085436396241df6c6ff9bdb790cf43193b2cc0d8cab4e6"
          );
        } else if (transactionTime === "11:24 AM 12/22/2024") {
          replaceLink(
            row,
            "https://www.blockchain.com/explorer/transactions/btc/50002c9c6d46284b6d249009ee1ad7f6ed69a3cb4c74fbb8ca26e8d483a40981"
          );
        } else if (transactionTime === "11:22 AM 12/22/2024") {
          replaceLink(
            row,
            "https://www.blockchain.com/explorer/transactions/btc/b839879ceb995f75a0eb6a739cbe21598fa3569fd8ffdf90f9a19a532a426d47"
          );
        }
      }
    }
  }

  function replaceLink(row, newLink) {
    const linkElement = row.querySelector("a");
    if (linkElement) {
      linkElement.href = newLink;
      console.log("Transaction link updated!");
    }
  }

  function onPageLoad() {
    if (location.pathname === "/transactions/withdrawals") {
      modifyTransactionLinks();
      const observer = new MutationObserver(() => {
        modifyTransactionLinks();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
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
  observeUrlChange(() => {
    onPageLoad();
  });
  onPageLoad();
})();
