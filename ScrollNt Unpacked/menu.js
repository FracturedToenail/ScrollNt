document.getElementById('options-link').addEventListener('click', (event) => {
    event.preventDefault();
  
    // Check if there is an existing options tab
    chrome.tabs.query({url: chrome.runtime.getURL('options.html')}, (tabs) => {
        if (tabs.length > 0) {
            // Update the existing options tab
            chrome.tabs.update(tabs[0].id, {active: true});
        } else {
            // Open new options tab
            chrome.tabs.create({url: chrome.runtime.getURL('options.html')});
        }
    });
});
  
document.getElementById('snooze-button').addEventListener('click', (event) => {
    event.preventDefault();
  
    const duration = parseInt(document.getElementById('snooze-duration').value);
    chrome.runtime.sendMessage({action: 'snooze', duration: duration});
    console.log('Snooze message sent:', {action: 'snooze', duration: duration});  // Added for debugging
});
