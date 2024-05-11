document.addEventListener('DOMContentLoaded', function() {
    const addVideoButton = document.getElementById('addVideo');
    const weekSelector = document.getElementById('weekSelector');
    const videoTitleInput = document.getElementById('videoTitle');
    const videoUrlInput = document.getElementById('videoUrl');
    const videoTableBody = document.getElementById('videoTableBody');

    let fitnessPlan = {
        1: [],
        2: [],
        3: [],
        4: []
    };

    // Load saved plan from localStorage if it exists
    if (localStorage.getItem('fitnessPlan')) {
        fitnessPlan = JSON.parse(localStorage.getItem('fitnessPlan'));
        updateVideoTable(weekSelector.value); // Update table on initial load
    }

    // Listen for the 'Add Video' button click
    addVideoButton.addEventListener('click', function() {
        const week = weekSelector.value;
        const title = videoTitleInput.value.trim();
        const url = videoUrlInput.value.trim();

        if (title && url) {
            const video = {
                title: title,
                url: url,
                isCompleted: false
            };
            fitnessPlan[week].push(video);
            localStorage.setItem('fitnessPlan', JSON.stringify(fitnessPlan));  // Save the updated plan to localStorage
            updateVideoTable(week);
            videoTitleInput.value = '';  // Clear input fields after adding
            videoUrlInput.value = '';
        } else {
            alert('Please enter both a title and a URL for the video.');
        }
    });

    // Function to update the video table based on the selected week
    function updateVideoTable(week) {
        const videos = fitnessPlan[week];
        videoTableBody.innerHTML = '';  // Clear existing entries

        videos.forEach((video, index) => {
            const row = videoTableBody.insertRow();
            const titleCell = row.insertCell(0);
            const urlCell = row.insertCell(1);
            const completedCell = row.insertCell(2);
            const toggleCompletedButton = document.createElement('button');

            titleCell.textContent = video.title;
            urlCell.textContent = video.url;
            toggleCompletedButton.textContent = video.isCompleted ? 'Completed' : 'Mark as completed';
            toggleCompletedButton.className = 'toggle-completion';
            toggleCompletedButton.addEventListener('click', () => {
                video.isCompleted = !video.isCompleted;
                localStorage.setItem('fitnessPlan', JSON.stringify(fitnessPlan));  // Update localStorage after toggling completion
                updateVideoTable(week);
            });
            completedCell.appendChild(toggleCompletedButton);
        });
    }

    // React to changes in week selection
    weekSelector.addEventListener('change', function() {
        updateVideoTable(this.value);
    });
});
