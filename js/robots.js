document.addEventListener('DOMContentLoaded', () => {
    // Create modal elements
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'robot-modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'robot-modal';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'robot-modal-close';
    closeButton.innerHTML = '×';
    
    modalContent.appendChild(closeButton);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Wait for images to load before starting animations
    const robotCards = document.querySelectorAll('.robot-card');
    let loadedImages = 0;
    const totalImages = robotCards.length;

    function startAnimations() {
        robotCards.forEach(card => {
            requestAnimationFrame(() => {
                card.classList.add('animate');
            });
        });
    }

    function handleImageLoad() {
        loadedImages++;
        if (loadedImages === totalImages) {
            // All images are loaded, start animations
            startAnimations();
        }
    }

    // Check if images are already cached
    robotCards.forEach(card => {
        const img = card.querySelector('img');
        if (img.complete) {
            handleImageLoad();
        } else {
            img.addEventListener('load', handleImageLoad);
        }
    });
    
    // Add click handlers to all robot cards
    robotCards.forEach(card => {
        card.addEventListener('click', () => {
            const robotName = card.querySelector('h2').textContent;
            const robotGame = card.querySelector('h3').textContent;
            const robotImage = card.querySelector('img').src;
            const robotSpecs = Array.from(card.querySelectorAll('.specs h4, .specs p')).map(el => el.textContent);
            
            // Create modal content
            modalContent.innerHTML = `
                <button class="robot-modal-close">×</button>
                <div class="robot-modal-content">
                    <div class="robot-modal-image">
                        <img src="${robotImage}" alt="${robotName}">
                    </div>
                    <div class="robot-modal-info">
                        <h2>${robotName}</h2>
                        <h3>${robotGame}</h3>
                        <div class="robot-modal-specs">
                            ${createSpecsHTML(robotSpecs)}
                        </div>
                    </div>
                </div>
            `;
            
            // Show modal with animation
            modalOverlay.classList.add('active');
            setTimeout(() => modalContent.classList.add('active'), 10);
            
            // Add close button handler
            modalContent.querySelector('.robot-modal-close').addEventListener('click', closeModal);
        });
    });
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close modal when pressing ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    function closeModal() {
        modalContent.classList.remove('active');
        setTimeout(() => modalOverlay.classList.remove('active'), 300);
    }
    
    function createSpecsHTML(specs) {
        let html = '';
        for (let i = 0; i < specs.length; i += 2) {
            if (specs[i] && specs[i + 1]) {
                html += `
                    <div class="spec-item">
                        <h4>${specs[i]}</h4>
                        <p>${specs[i + 1]}</p>
                    </div>
                `;
            }
        }
        return html;
    }
}); 