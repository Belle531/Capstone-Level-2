const bannerText = document.querySelector('.banner-text');

    bannerText.addEventListener('animationend', () => {
        bannerText.style.transform = 'translateX(0%)';

    });
