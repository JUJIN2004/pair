document.addEventListener('DOMContentLoaded', () => {
    console.log("Script Loaded!");

    const allInputs = document.querySelectorAll('.star-rating input');
    
    allInputs.forEach(radio => {
        radio.addEventListener('change', (e) => {
            console.log("Star clicked: " + e.target.value);
            
            const parentBox = e.target.closest('.rating-box');
            
            // Safety check to ensure parentBox exists
            if (parentBox) {
                const numDisplay = parentBox.querySelector('.rating-num');
                
                if (numDisplay) {
                    // Update Text
                    numDisplay.innerText = e.target.value + ".0";
                    
                    // Trigger Animation
                    numDisplay.classList.remove('animate-pop');
                    void numDisplay.offsetWidth; // The magic reset
                    numDisplay.classList.add('animate-pop');
                }
            }
        });
    });
});