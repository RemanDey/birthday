document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image img');

    // Array of image URLs from the web
    const imageUrls = [
        'pic1.jpeg',
        'pic2.jpeg',
        'pic3.jpeg',
        'pic4.jpeg',
        // Add more URLs as needed
    ];

    images.forEach((img, index) => {
        if (imageUrls[index]) {
            img.src = imageUrls[index];
        } else {
            // Fallback for cases where there are more <img> tags than URLs
            img.src = '';
        }
    });

    // Typewriter effect logic with scroll detection
    const letter = document.querySelector('.letter');
    const message = `5th June, 2026.

My dear Doctor sahab,

Happy Birthday! (Happiest nahi bolungi kyuki voh toh tu mere saath hoti hai)
mmm... maza nahi aaya , Tiloi gang aise mauke par kya karti hai ? Ha Ha right, maafi maangti...
क्षमा करें महोदया जी,
मैंने आपकी पूर्व अनुमति प्राप्त किए बिना आपको जन्मदिन की शुभकामनाएँ दे दीं।.
 Vaise..ye pehla birthday hai jab hum saath nahi hain...(bahut bachpan ke baad), lekin yrr  Mathura wali feel nahi aa rhi hai, abb toh mujhe nahi karna enjoy akele, koi gift, koi cake, koi bhi cheez mujhe sirf mere liye nahi chahiye.
Aise toh humara long-distance relationship ho gaya hai phirse, but ab pehle jaisa nahi hai. Tuney kaala jaadu toh nahi kiya na?
Ye pehla b'day hai tera MBBS lene ke baad,
ik tere struggles, teri hardships, tere failures, agar koi aisa hai jisne ye sab har ek sec. ke liye dekha hai , toh woh main hu.
And I know tu kitni strong aur kitni ambitious hai. Tune bahut mehnat kari thi yrr Tiloi ke liye. Bhai tere dr. ko littmann meine pehnaya tha, tujhe bhi maine hi pehnaungi, bas 50 saal wait kar le...
mere liye itna toh tu kar hi sakti hai.
Vaise bhi tu koi achhi medico toh ban nahi rhi hai ...mera general examination kiya tha abhi....ye bhi pta nhi kr paayi ..that my heart has a hole in it...aur ye hole tab bhar jaata hai...when you are with me....
Toh yha tere sabse bade patient ki history end hoti hai....

I love you baby...
Missing you a little more today...`;

    if (letter) {
        letter.textContent = ''; // Clear placeholder text

        // Use Intersection Observer to detect when letter comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Start typewriter effect when letter becomes visible
                    let charIndex = 0;
                    function typeWriter() {
                        if (charIndex < message.length) {
                            letter.textContent += message.charAt(charIndex);
                            charIndex++;
                            setTimeout(typeWriter, 40); // Adjust speed (ms) here
                        }
                    }

                    typeWriter();
                    // Stop observing after the effect starts
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        observer.observe(letter);
    }

    console.log('Page 2 scripts loaded. Typewriter will start on scroll to letter.');
});