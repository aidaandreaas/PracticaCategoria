
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM listo");

   
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');
    let index = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            index = Number(dot.dataset.index);
            updateCarousel();
        });
    });

    setInterval(() => {
        index = (index + 1) % dots.length;
        updateCarousel();
    }, 5000);

    
    const chips = document.querySelectorAll(".chip");
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            chips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
        });
    });

   
    const dropdowns = document.querySelectorAll(".custom-dropdown");
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector(".custom-dropdown-toggle");

        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("open");
        });
    });

    
    document.addEventListener("click", () => {
        dropdowns.forEach(dropdown => dropdown.classList.remove("open"));
    });

 
    const openLogin = document.getElementById('openLogin');
    const loginModal = document.getElementById('loginModal');

    if(openLogin && loginModal) {
        openLogin.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('active');
            document.body.classList.add('modal-open');
        });

        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if(signUpButton && signInButton && container){
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }
});


let position = 0;

function moveCategories(direction) {
    const track = document.getElementById("categoryTrack");
    if (!track) return;

    const card = track.querySelector(".category-card");
    const gap = 24; 
    const cardWidth = card.offsetWidth + gap;
    const visibleWidth = track.parentElement.offsetWidth;
    const totalWidth = track.scrollWidth;
    const maxScroll = totalWidth - visibleWidth;

    position += direction * cardWidth;

    
    if (position > 0) position = 0;
    if (Math.abs(position) > maxScroll) position = -maxScroll;

    track.style.transform = `translateX(${position}px)`;
}

