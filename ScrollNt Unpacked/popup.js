window.onload = function() {
    console.log("loaded");

    function showRandomCardFromGroup(groupPrefix, startNumber, endNumber) {
        const cardNumberToDisplay = startNumber + Math.floor(Math.random() * endNumber);
        console.log("Random card to display in group: ", groupPrefix, cardNumberToDisplay);
    
        for (let i = startNumber; i <= endNumber; i++) {
            const cardId = groupPrefix + i;
            const card = document.getElementById(cardId);
            if (card != undefined) {
                if (i == cardNumberToDisplay) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            } else {
                console.warn("element '" + cardId + "' is not found");
            }
        }
    }

    showRandomCardFromGroup("short_", 1, 4);
    showRandomCardFromGroup("med_", 1, 3);
    showRandomCardFromGroup("long_", 1, 3);

    document.getElementById('snooze-button').addEventListener('click', () => {
        const duration = parseInt(document.getElementById('snooze-duration').value);
        chrome.runtime.sendMessage({action: 'snooze', duration: duration});
        // window.close();
    });

// ... (rest of the code)

  
    const urlParams = new URLSearchParams(window.location.search);
    const text = urlParams.get('text');
    const color = urlParams.get('color');
  
    if (text) {
      document.getElementById('text').innerText = text;
    }
  
    if (color) {
      document.body.style.backgroundColor = color;
    }
  };
  