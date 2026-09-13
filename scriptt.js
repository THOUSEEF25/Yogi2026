document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const introScreen = document.getElementById("introScreen");
    const enterButton = document.getElementById("enterButton");

    const bgMusic = document.getElementById("bgMusic");
    const musicButton = document.getElementById("musicButton");
    const musicText = document.getElementById("musicText");

    const openLetter = document.getElementById("openLetter");
    const closeLetter = document.getElementById("closeLetter");
    const letterOverlay = document.getElementById("letterOverlay");

    const scrollPhoto = document.getElementById("scrollPhoto");
    const photoSection = document.getElementById("photoSection");

    const confettiContainer = document.getElementById("confetti");

    const card = document.querySelector(".photo-card");


    /* =========================================
       INTRO SCREEN + MUSIC
    ========================================= */

    if (introScreen && enterButton) {

        // Keep the main page locked behind intro
        document.body.classList.add("intro-active");

        enterButton.addEventListener("click", async () => {

            console.log("Enter button clicked");


            /* -----------------------------------------
               START MUSIC
            ----------------------------------------- */

            if (bgMusic) {

                try {

                    bgMusic.volume = 0.7;

                    await bgMusic.play();

                    console.log("Music started successfully");

                    if (musicText) {
                        musicText.textContent = "Pause Music";
                    }

                    if (musicButton) {
                        musicButton.classList.add("playing");

                        const icon =
                            musicButton.querySelector(".music-icon i");

                        if (icon) {
                            icon.className = "fa-solid fa-pause";
                        }
                    }

                } catch (error) {

                    console.error("Music could not start:", error);

                    /*
                     * Even if music fails, still allow
                     * the user to enter the website.
                     */

                    if (musicText) {
                        musicText.textContent = "Play Music";
                    }
                }
            }


            /* -----------------------------------------
               HIDE INTRO SCREEN
            ----------------------------------------- */

            introScreen.classList.add("hide");

            document.body.classList.remove("intro-active");


            /* -----------------------------------------
               Make sure page starts at the top
            ----------------------------------------- */

            window.scrollTo({
                top: 0,
                behavior: "auto"
            });

        });

    }


    /* =========================================
       MUSIC CONTROL
    ========================================= */

    if (musicButton && bgMusic) {

        musicButton.addEventListener("click", async () => {

            try {

                if (bgMusic.paused) {

                    await bgMusic.play();

                    musicButton.classList.add("playing");

                    if (musicText) {
                        musicText.textContent = "Pause Music";
                    }

                    const icon =
                        musicButton.querySelector(".music-icon i");

                    if (icon) {
                        icon.className = "fa-solid fa-pause";
                    }

                } else {

                    bgMusic.pause();

                    musicButton.classList.remove("playing");

                    if (musicText) {
                        musicText.textContent = "Play Music";
                    }

                    const icon =
                        musicButton.querySelector(".music-icon i");

                    if (icon) {
                        icon.className = "fa-solid fa-music";
                    }
                }

            } catch (error) {

                console.warn(
                    "Audio playback issue:",
                    error
                );

            }

        });

    }


    /* =========================================
       OPEN LETTER + CONFETTI
    ========================================= */

    if (openLetter && letterOverlay) {

        openLetter.addEventListener("click", () => {

            letterOverlay.classList.add("active");

            document.body.style.overflow = "hidden";

            createConfetti();

        });

    }


    /* =========================================
       CLOSE LETTER
    ========================================= */

    function closeLetterModal() {

        if (letterOverlay) {

            letterOverlay.classList.remove("active");

            /*
             * If intro is already closed,
             * restore normal scrolling.
             */

            if (!document.body.classList.contains("intro-active")) {
                document.body.style.overflow = "";
            }

        }

    }


    if (closeLetter) {

        closeLetter.addEventListener(
            "click",
            closeLetterModal
        );

    }


    if (letterOverlay) {

        letterOverlay.addEventListener("click", (event) => {

            if (event.target === letterOverlay) {
                closeLetterModal();
            }

        });

    }


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeLetterModal();
        }

    });


    /* =========================================
       SCROLL TO PHOTO
    ========================================= */

    if (scrollPhoto && photoSection) {

        scrollPhoto.addEventListener("click", () => {

            photoSection.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }


    /* =========================================
       CONFETTI
    ========================================= */

    function createConfetti() {

        if (!confettiContainer) return;

        const colors = [
            "#ff6f91",
            "#ff9db5",
            "#ffd166",
            "#c9a1ff",
            "#ffffff",
            "#ffcad8"
        ];

        for (let i = 0; i < 80; i++) {

            const piece = document.createElement("div");

            piece.classList.add("confetti-piece");

            piece.style.left =
                Math.random() * 100 + "vw";

            piece.style.background =
                colors[
                    Math.floor(
                        Math.random() * colors.length
                    )
                ];

            piece.style.animationDuration =
                (Math.random() * 2 + 2.5) + "s";

            piece.style.animationDelay =
                Math.random() * 0.7 + "s";


            /*
             * FIXED:
             * This needs backticks, not single quotes.
             */

            piece.style.transform =
                `rotate(${Math.random() * 360}deg)`;


            confettiContainer.appendChild(piece);


            setTimeout(() => {

                piece.remove();

            }, 5000);

        }

    }


    /* =========================================
       FLOATING HEARTS
    ========================================= */

    function createFloatingHeart() {

        const heart = document.createElement("div");

        heart.innerHTML = "♥️";

        heart.style.position = "fixed";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.bottom = "-30px";

        heart.style.color = "#ff6f91";

        heart.style.opacity = "0.5";

        heart.style.fontSize =
            (Math.random() * 15 + 12) + "px";

        heart.style.pointerEvents = "none";

        heart.style.zIndex = "0";


        document.body.appendChild(heart);


        const duration =
            Math.random() * 5 + 6;


        heart.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 0
                },
                {
                    transform:
                        "translateY(-50vh) rotate(20deg)",
                    opacity: 0.5
                },
                {
                    transform:
                        "translateY(-110vh) rotate(-20deg)",
                    opacity: 0
                }
            ],
            {
                duration: duration * 1000,
                easing: "ease-in-out"
            }
        );


        setTimeout(() => {

            heart.remove();

        }, duration * 1000);

    }


    setInterval(
        createFloatingHeart,
        2500
    );


    /* =========================================
       PARALLAX / MOUSE EFFECT
    ========================================= */

    document.addEventListener("mousemove", (event) => {

        if (
            window.innerWidth < 900 ||
            !card
        ) {
            return;
        }


        const x =
            (event.clientX / window.innerWidth - 0.5) * 8;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 8;


        /*
         * FIXED:
         * Use backticks for ${x} and ${y}.
         */

        card.style.transform =
            `rotate(3deg) translate(${x}px, ${y}px)`;

    });


    window.addEventListener("mouseleave", () => {

        if (card) {
            card.style.transform =
                "rotate(3deg)";
        }

    });


    /* =========================================
       PAGE LOADED
    ========================================= */

    document.body.classList.add("loaded");

});
