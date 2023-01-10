// Marckenley Celestin / Electric Zone 2022

const scrollTopWrapper = document.querySelector('.scroll-top-wrapper');
let isScrolling;

scrollTopWrapper.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});


function checkScrollTop() {
    if (window.scrollY === 0) {
        scrollTopWrapper.classList.add('hidden');
    } else {
        scrollTopWrapper.classList.remove('hidden');
    }
    isScrolling = false;
}


window.addEventListener('scroll', () => {
    if (isScrolling) return;
    isScrolling = true;
    window.requestAnimationFrame(checkScrollTop);
    
});
