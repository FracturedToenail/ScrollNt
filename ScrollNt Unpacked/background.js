let snoozeTime;
let popupIntervalId;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received:', request);  // Added for debugging
    if (request.action === 'snooze') {
        snoozeTime = Date.now() + request.duration * 60000;

        // Close all popup tabs
        chrome.tabs.query({url: chrome.runtime.getURL('popup.html')}, (tabs) => {
            tabs.forEach((tab) => {
                chrome.tabs.remove(tab.id);
            });
        });
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('youtube.com')) {
        if (snoozeTime && Date.now() < snoozeTime) {
            return;
        }

        const disablePopup = localStorage.getItem('disablePopup') === 'true';
        const intervalPopup = localStorage.getItem('intervalPopup') === 'true';
        const intervalDuration = parseInt(localStorage.getItem('intervalDuration')) || 0;

        if (!disablePopup && (!intervalPopup || !popupIntervalId)) {
            // Close any existing popup tabs
            chrome.tabs.query({url: chrome.runtime.getURL('popup.html')}, (tabs) => {
                tabs.forEach((tab) => {
                    chrome.tabs.remove(tab.id);
                });

                // Open new popup tab
                chrome.tabs.create({ url: "popup.html" });
            });
        }

        if (intervalPopup && !popupIntervalId) {
            popupIntervalId = setInterval(() => {
                // Close any existing popup tabs
                chrome.tabs.query({url: chrome.runtime.getURL('popup.html')}, (tabs) => {
                    tabs.forEach((tab) => {
                        chrome.tabs.remove(tab.id);
                    });

                    // Open new popup tab
                    chrome.tabs.create({ url: "popup.html" });
                });
            }, intervalDuration * 60000);
        } else if (!intervalPopup && popupIntervalId) {
            clearInterval(popupIntervalId);
            popupIntervalId = null;
        }
    }
});

chrome.runtime.onInstalled.addListener(({reason}) => {
    if (reason === 'install') {
        chrome.tabs.create({url: "startup.html"});
    }
});
