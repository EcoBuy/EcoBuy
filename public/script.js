document.addEventListener('DOMContentLoaded', () => {
    // Music Playback Functionality
    const audioTracks = [
        document.getElementById('backgroundMusic1'),
        document.getElementById('backgroundMusic2'),
        document.getElementById('backgroundMusic3')
    ];
    let currentTrackIndex = 0;

    function playMusic() {
        const currentTrack = audioTracks[currentTrackIndex];
        currentTrack.play().catch(error => {
            console.log('Autoplay was prevented:', error);
        });

        currentTrack.addEventListener('ended', () => {
            currentTrackIndex = (currentTrackIndex + 1) % audioTracks.length;
            const nextTrack = audioTracks[currentTrackIndex];
            nextTrack.play();
        });
    }

    const playButton = document.createElement('button');
    playButton.textContent = 'Start Music';
    playButton.style.position = 'fixed';
    playButton.style.top = '20px';
    playButton.style.right = '20px';
    playButton.style.zIndex = '1000';
    playButton.style.padding = '10px 20px';
    playButton.style.fontSize = '16px';
    playButton.style.backgroundColor = '#007BFF';
    playButton.style.color = '#FFFFFF';
    playButton.style.border = 'none';
    playButton.style.borderRadius = '5px';
    playButton.style.cursor = 'pointer';
    playButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    playButton.style.transition = 'background-color 0.3s ease';

    playButton.addEventListener('mouseover', () => {
        playButton.style.backgroundColor = '#0056b3';
    });
    playButton.addEventListener('mouseout', () => {
        playButton.style.backgroundColor = '#007BFF';
    });

    playButton.addEventListener('click', () => {
        playMusic();
        playButton.remove();
    });

    document.body.appendChild(playButton);

    // Welcome Screen Functionality
    const welcomeScreen = document.getElementById('welcome-screen');
    const startButton = document.getElementById('start-button');
    const mainContent = document.querySelector('.main-content');
    const body = document.body;

    startButton.addEventListener('click', () => {
        welcomeScreen.classList.add('slide-out-left');
        
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mainContent.classList.add('visible');
            body.classList.add('scrolled');
        }, 2000); // Matches the CSS transition duration
    });
});
