document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('mainButton');
    const welcomeText = document.querySelector('.central-box p');

    const flowerField = document.querySelector('.flower-field');
    const heartbeatAudio = document.getElementById('heartbeatAudio');

    if (button) {
        button.addEventListener('click', () => {
            window.location.href = 'page_2.html';
        });
    }

    if (heartbeatAudio) {
        heartbeatAudio.volume = 1.0; // set to max volume, can be adjusted as needed
        const unlockAudio = () => {
            heartbeatAudio.play().catch(() => {});
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
        };

        const playPromise = heartbeatAudio.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                document.addEventListener('click', unlockAudio, { once: true });
                document.addEventListener('touchstart', unlockAudio, { once: true });
            });
        }
    }

    const message = "Suffering from severe \"missing you\" disorder!!!";
    
    if (welcomeText) {
        welcomeText.textContent = ''; 
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < message.length) {
                welcomeText.textContent += message.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 60);
            }
        }
        
        // Start typing after a short initial delay
        setTimeout(typeWriter, 500);
    }

    const heartIcon = document.querySelector('.heart-icon');
    const anatomicalHeart = document.querySelector('.anatomical-heart');
    function adjustHeartAnimation() {
        if (!heartIcon) return;
        let duration = '1.2s';
        if (window.innerWidth < 480) {
            duration = '0.9s';
        } else if (window.innerWidth < 900) {
            duration = '1.1s';
        }
        heartIcon.style.animationDuration = duration;
        if (anatomicalHeart) {
            anatomicalHeart.style.animationDuration = duration;
        }
    }
    adjustHeartAnimation();

    // --- Dynamic pink flowers in the background ---
    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    function makeFlowerSVG() {
        // simple stylized pink flower SVG (petals + center)
        return `
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g fill="none" fill-rule="evenodd">
                <ellipse cx="32" cy="20" rx="10" ry="16" fill="#ff86b7" transform="rotate(-25 32 20)" />
                <ellipse cx="32" cy="20" rx="10" ry="16" fill="#ff4fa3" transform="rotate(25 32 20)" />
                <ellipse cx="32" cy="28" rx="10" ry="16" fill="#ff6fb0" transform="rotate(80 32 28)" />
                <circle cx="32" cy="34" r="6" fill="#ffd1e8" />
            </g>
        </svg>`;
    }

    function createFlower() {
        if (!flowerField) return null;
        const el = document.createElement('div');
        el.className = 'flower';
        const size = Math.floor(rand(18, 48));
        const left = rand(0, 100);
        const duration = rand(6, 14).toFixed(2) + 's';
        const delay = rand(0, 6).toFixed(2) + 's';
        el.style.setProperty('--size', size + 'px');
        el.style.setProperty('--duration', duration);
        el.style.setProperty('--delay', delay);
        el.style.left = left + '%';
        el.style.top = rand(-20, -5) + 'vh';
        el.innerHTML = makeFlowerSVG();

        // On each loop/randomize horizontal position & speed
        el.addEventListener('animationiteration', () => {
            el.style.left = rand(0, 100) + '%';
            el.style.setProperty('--duration', rand(6, 14).toFixed(2) + 's');
        });

        flowerField.appendChild(el);
        return el;
    }

    // create a responsive number of flowers
    function populateFlowers() {
        if (!flowerField) return;
        flowerField.innerHTML = '';
        const vw = Math.max(window.innerWidth || 0, 320);
        let count = 18;
        if (vw < 480) count = 8;
        else if (vw < 900) count = 12;
        for (let i = 0; i < count; i++) {
            createFlower();
        }
    }

    populateFlowers();
    window.addEventListener('resize', () => {
        // throttle simple resize handling
        clearTimeout(window._flowerResizeTimeout);
        window._flowerResizeTimeout = setTimeout(() => {
            populateFlowers();
            adjustHeartAnimation();
        }, 250);
    });

    // --- end flower code ---

    console.log('Index initialized.');
});