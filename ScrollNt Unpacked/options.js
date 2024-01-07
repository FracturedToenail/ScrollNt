document.getElementById('interval-popup').addEventListener('change', (event) => {
    document.getElementById('interval-duration').disabled = !event.target.checked;
});

document.getElementById('enable-tracking').addEventListener('change', (event) => {
    document.getElementById('tracking-info').style.display = event.target.checked ? 'block' : 'none';
});

document.getElementById('save-button').addEventListener('click', () => {
    const color = document.getElementById('background-color').value;
    const disablePopup = document.getElementById('disable-popup').checked;
    const intervalPopup = document.getElementById('interval-popup').checked;
    const intervalDuration = document.getElementById('interval-duration').value;
    const enableTracking = document.getElementById('enable-tracking').checked;
    const useMinutes = document.getElementById('use-minutes').checked;

    localStorage.setItem('backgroundColor', color);
    localStorage.setItem('disablePopup', disablePopup);
    localStorage.setItem('intervalPopup', intervalPopup);
    localStorage.setItem('intervalDuration', intervalDuration);
    localStorage.setItem('enableTracking', enableTracking);
    localStorage.setItem('useMinutes', useMinutes);
  
    // Reload the webpage
    location.reload();


  localStorage.setItem('backgroundColor', color);
  localStorage.setItem('disablePopup', disablePopup);
  localStorage.setItem('intervalPopup', intervalPopup);
  localStorage.setItem('intervalDuration', intervalDuration);
  localStorage.setItem('enableTracking', enableTracking);
  localStorage.setItem('useMinutes', useMinutes);
});

window.onload = function() {
    // Load settings
    document.getElementById('disablePopup').checked = localStorage.getItem('disablePopup') === 'true';
    document.getElementById('intervalPopup').checked = localStorage.getItem('intervalPopup') === 'true';
    document.getElementById('intervalDuration').value = localStorage.getItem('intervalDuration') || 5;
    document.getElementById('enableTracking').checked = localStorage.getItem('enableTracking') === 'true';
    document.getElementById('useMinutes').checked = localStorage.getItem('useMinutes') === 'true';
    document.getElementById('backgroundColor').value = localStorage.getItem('backgroundColor') || '#FFFFFF';
    document.getElementById('textColor').value = localStorage.getItem('textColor') || '#000000';
  
    // Save settings
    document.getElementById('save').addEventListener('click', () => {
      localStorage.setItem('disablePopup', document.getElementById('disablePopup').checked);
      localStorage.setItem('intervalPopup', document.getElementById('intervalPopup').checked);
      localStorage.setItem('intervalDuration', document.getElementById('intervalDuration').value);
      localStorage.setItem('enableTracking', document.getElementById('enableTracking').checked);
      localStorage.setItem('useMinutes', document.getElementById('useMinutes').checked);
      localStorage.setItem('backgroundColor', document.getElementById('backgroundColor').value);
      localStorage.setItem('textColor', document.getElementById('textColor').value);
      location.reload();
    });
  };
  

// Load saved options
document.body.style.backgroundColor = localStorage.getItem('backgroundColor');
document.getElementById('background-color').value = localStorage.getItem('backgroundColor');
document.getElementById('disable-popup').checked = localStorage.getItem('disablePopup') === 'true';
document.getElementById('interval-popup').checked = localStorage.getItem('intervalPopup') === 'true';
document.getElementById('interval-duration').value = localStorage.getItem('intervalDuration');
document.getElementById('interval-duration').disabled = localStorage.getItem('intervalPopup') !== 'true';
document.getElementById('enable-tracking').checked = localStorage.getItem('enableTracking') === 'true';
document.getElementById('use-minutes').checked = localStorage.getItem('useMinutes') === 'true';

// Display tracked time
if (localStorage.getItem('enableTracking') === 'true') {
    let totalTime = localStorage.getItem('youtubeTime') || 0;
    let timeWithPopupOn = localStorage.getItem('youtubeTimeWithPopupOn') || 0;
    let timeWithPopupOff = localStorage.getItem('youtubeTimeWithPopupOff') || 0;
  
    if (localStorage.getItem('useMinutes') === 'true') {
        totalTime /= 60000; // convert ms to minutes
        timeWithPopupOn /= 60000;
        timeWithPopupOff /= 60000;
    } else {
        totalTime /= 3600000; // convert ms to hours
        timeWithPopupOn /= 3600000;
        timeWithPopupOff /= 3600000;
    }
  
    document.getElementById('total-time').textContent = totalTime;
    document.getElementById('time-with-popup-on').textContent = timeWithPopupOn;
    document.getElementById('time-with-popup-off').textContent = timeWithPopupOff;
}
