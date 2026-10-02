// ===============================
// MOORS FOUNDATION WEBSITE SCRIPT
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // MOBILE MENU
    // ===============================
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".navbar");

    if(menuToggle && nav){
        menuToggle.addEventListener("click",()=>{
            nav.classList.toggle("show");
        });
    }

    // ===============================
    // STICKY HEADER
    // ===============================

    const header = document.querySelector("header");

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 50){
            header.classList.add("sticky");
        }else{
            header.classList.remove("sticky");
        }

    });


    // ===============================
    // SMOOTH SCROLLING
    // ===============================

    document.querySelectorAll('a[href^="#"]').forEach(link=>{

        link.addEventListener("click",(e)=>{

            e.preventDefault();

            const target=document.querySelector(link.getAttribute("href"));

            if(target){

                target.scrollIntoView({
                    behavior:"smooth"
                });

            }

        });

    });


    // ===============================
    // ACTIVE NAVIGATION
    // ===============================

    const navLinks=document.querySelectorAll(".navbar a");

    navLinks.forEach(link=>{

        link.addEventListener("click",()=>{

            navLinks.forEach(item=>item.classList.remove("active"));

            link.classList.add("active");

        });

    });


    // ===============================
    // SCROLL ANIMATION
    // ===============================

    const reveals=document.querySelectorAll(".reveal");

    function reveal(){

        reveals.forEach(item=>{

            const top=item.getBoundingClientRect().top;

            if(top < window.innerHeight-100){

                item.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll",reveal);

    reveal();


    // ===============================
    // COUNTER
    // ===============================

    const counters=document.querySelectorAll(".counter");

    counters.forEach(counter=>{

        const update=()=>{

            const target=+counter.getAttribute("data-target");

            const count=+counter.innerText;

            const increment=target/200;

            if(count<target){

                counter.innerText=Math.ceil(count+increment);

                setTimeout(update,15);

            }else{

                counter.innerText=target;

            }

        }

        update();

    });


    // ===============================
    // DONATE BUTTON
    // ===============================

    const donate=document.querySelectorAll(".donate-btn");

    donate.forEach(btn=>{

        btn.addEventListener("click",()=>{

            btn.innerHTML="❤ Thank You!";

            btn.style.background="#28a745";

        });

    });


    // ===============================
    // CONTACT FORM
    // ===============================

    const contact=document.getElementById("contactForm");

    if(contact){

        contact.addEventListener("submit",(e)=>{

            e.preventDefault();

            const name=document.getElementById("name").value.trim();

            const email=document.getElementById("email").value.trim();

            const message=document.getElementById("message").value.trim();

            if(name==="" || email==="" || message===""){

                alert("Please fill in all fields.");

                return;

            }

            alert("Message sent successfully!");

            contact.reset();

        });

    }


    // ===============================
    // VOLUNTEER FORM
    // ===============================

    const volunteer=document.getElementById("volunteerForm");

    if(volunteer){

        volunteer.addEventListener("submit",(e)=>{

            e.preventDefault();

            alert("Thank you for volunteering with us!");

            volunteer.reset();

        });

    }


    // ===============================
    // NEWSLETTER
    // ===============================

    const newsletter=document.getElementById("newsletter");

    if(newsletter){

        newsletter.addEventListener("submit",(e)=>{

            e.preventDefault();

            alert("Successfully subscribed!");

            newsletter.reset();

        });

    }


    // ===============================
    // GALLERY LIGHTBOX
    // ===============================

    const gallery=document.querySelectorAll(".gallery img");

    gallery.forEach(img=>{

        img.addEventListener("click",()=>{

            const light=document.createElement("div");

            light.style.position="fixed";

            light.style.top="0";

            light.style.left="0";

            light.style.width="100%";

            light.style.height="100%";

            light.style.background="rgba(0,0,0,.9)";

            light.style.display="flex";

            light.style.justifyContent="center";

            light.style.alignItems="center";

            light.style.cursor="pointer";

            light.style.zIndex="9999";

            const image=document.createElement("img");

            image.src=img.src;

            image.style.maxWidth="90%";

            image.style.maxHeight="90%";

            image.style.borderRadius="10px";

            light.appendChild(image);

            document.body.appendChild(light);

            light.addEventListener("click",()=>{

                light.remove();

            });

        });

    });


    // ===============================
    // BACK TO TOP
    // ===============================

    const topButton=document.createElement("button");

    topButton.innerHTML="▲";

    topButton.id="topButton";

    document.body.appendChild(topButton);

    topButton.style.position="fixed";

    topButton.style.bottom="30px";

    topButton.style.right="30px";

    topButton.style.display="none";

    topButton.style.padding="12px 15px";

    topButton.style.border="none";

    topButton.style.borderRadius="50%";

    topButton.style.background="#007B5E";

    topButton.style.color="#fff";

    topButton.style.cursor="pointer";

    topButton.style.fontSize="18px";

    topButton.style.zIndex="1000";

    window.addEventListener("scroll",()=>{

        if(window.scrollY>300){

            topButton.style.display="block";

        }else{

            topButton.style.display="none";

        }

    });

    topButton.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });


    // ===============================
    // PAGE LOADER
    // ===============================

    const loader=document.getElementById("loader");

    if(loader){

        window.addEventListener("load",()=>{

            loader.style.display="none";

        });

    }

});
/* ==========================================================
   Heart of Harmony Foundation — script.js
   Handles: gallery lightbox, header scroll effect,
   smooth scrolling, and mobile nav toggle (if present).
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScrollEffect();
    initGalleryLightbox();
    initSmoothScroll();
    initMobileNavToggle();
});

/* ----------------------------------------------------------
   1. Header shadow on scroll
   Adds a "scrolled" class to <header> once the user scrolls
   past 20px, so you can style a subtle shadow/background
   change in CSS: header.scrolled { box-shadow: ...; }
---------------------------------------------------------- */
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;

    const toggleHeaderClass = () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    };

    toggleHeaderClass();
    window.addEventListener('scroll', toggleHeaderClass, { passive: true });
}

/* ----------------------------------------------------------
   2. Gallery Lightbox
   Clicking any .gallery-item image opens a fullscreen
   overlay with the larger image, prev/next navigation,
   and close on click, ESC key, or overlay background click.
---------------------------------------------------------- */
function initGalleryLightbox() {
    const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
    if (galleryImages.length === 0) return;

    // Build lightbox markup once and append to body
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
        <img class="lightbox-img" src="" alt="">
        <button class="lightbox-next" aria-label="Next image">&#10095;</button>
        <div class="lightbox-counter"></div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const counter = lightbox.querySelector('.lightbox-counter');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;

    const showImage = (index) => {
        currentIndex = (index + galleryImages.length) % galleryImages.length;
        const img = galleryImages[currentIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
    };

    const openLightbox = (index) => {
        showImage(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // lock background scroll
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

    // Close when clicking the dark overlay background (not the image/buttons)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
}

/* ----------------------------------------------------------
   3. Smooth scroll for on-page anchor links
   e.g. <a href="#something">
   (Links with href="#" alone are ignored so buttons like
   "Become a Volunteer" don't error out if unassigned yet.)
---------------------------------------------------------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;

        link.addEventListener('click', (e) => {
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

/* ----------------------------------------------------------
   4. Mobile nav toggle
   Only activates if you add a hamburger button with
   class="nav-toggle" inside <header>. Safe to leave in
   even if that button doesn't exist yet.
---------------------------------------------------------- */
function initMobileNavToggle() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        toggle.classList.toggle('active');
    });

    // Close menu when a nav link is clicked (useful on mobile)
    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.classList.remove('active');
        });
    });
}