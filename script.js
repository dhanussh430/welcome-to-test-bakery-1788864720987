

document.addEventListener(
  'DOMContentLoaded',
  () => {

    const slides =
      Array.from(
        document.querySelectorAll('.site-slide')
      );

    const dots =
      Array.from(
        document.querySelectorAll('.dot')
      );

    const navLinks =
      Array.from(
        document.querySelectorAll('.nav-link')
      );


    let currentIndex = 0;


    // --------------------------------------------------------
    // GO TO SLIDE
    // --------------------------------------------------------

    function goToSlide(index) {

      if (!slides.length) return;

      index =
        Math.max(
          0,
          Math.min(
            index,
            slides.length - 1
          )
        );

      slides[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      currentIndex = index;

      updateNavigation(index);
    }


    // --------------------------------------------------------
    // UPDATE DOTS + NAV
    // --------------------------------------------------------

    function updateNavigation(index) {

      dots.forEach(
        (dot, i) => {

          dot.classList.toggle(
            'active',
            i === index
          );

        }
      );


      navLinks.forEach(
        link => {

          link.classList.toggle(
            'active',
            link.dataset.slide ===
            slides[index]?.id
          );

        }
      );

    }


    // --------------------------------------------------------
    // DOT CLICK
    // --------------------------------------------------------

    dots.forEach(
      (dot, index) => {

        dot.addEventListener(
          'click',
          () => {

            goToSlide(index);

          }
        );

      }
    );


    // --------------------------------------------------------
    // NAV LINK CLICK
    // --------------------------------------------------------

    navLinks.forEach(
      link => {

        link.addEventListener(
          'click',
          event => {

            event.preventDefault();

            const targetId =
              link.dataset.slide;

            const targetIndex =
              slides.findIndex(
                slide =>
                  slide.id === targetId
              );

            if (targetIndex >= 0) {

              goToSlide(targetIndex);

            }

          }
        );

      }
    );


    // --------------------------------------------------------
    // NEXT / PREVIOUS BUTTONS
    // --------------------------------------------------------

    document.querySelectorAll(
      '[data-next]'
    ).forEach(
      button => {

        button.addEventListener(
          'click',
          () => {

            goToSlide(
              currentIndex + 1
            );

          }
        );

      }
    );


    document.querySelectorAll(
      '[data-prev]'
    ).forEach(
      button => {

        button.addEventListener(
          'click',
          () => {

            goToSlide(
              currentIndex - 1
            );

          }
        );

      }
    );


    // --------------------------------------------------------
    // KEYBOARD CONTROL
    // --------------------------------------------------------

    document.addEventListener(
      'keydown',
      event => {

        if (
          event.key === 'ArrowDown' ||
          event.key === 'PageDown'
        ) {

          event.preventDefault();

          goToSlide(
            currentIndex + 1
          );

        }


        if (
          event.key === 'ArrowUp' ||
          event.key === 'PageUp'
        ) {

          event.preventDefault();

          goToSlide(
            currentIndex - 1
          );

        }


        if (event.key === 'Home') {

          goToSlide(0);

        }


        if (event.key === 'End') {

          goToSlide(
            slides.length - 1
          );

        }

      }
    );


    // --------------------------------------------------------
    // MOUSE WHEEL
    // --------------------------------------------------------

    let wheelLocked = false;


    window.addEventListener(
      'wheel',
      event => {

        if (wheelLocked) return;

        if (
          Math.abs(event.deltaY) < 20
        ) {
          return;
        }

        wheelLocked = true;


        if (event.deltaY > 0) {

          goToSlide(
            currentIndex + 1
          );

        } else {

          goToSlide(
            currentIndex - 1
          );

        }


        setTimeout(
          () => {

            wheelLocked = false;

          },
          700
        );

      },
      { passive: true }
    );


    // --------------------------------------------------------
    // INTERSECTION OBSERVER
    // --------------------------------------------------------

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                const index =
                  slides.indexOf(
                    entry.target
                  );

                if (index >= 0) {

                  currentIndex =
                    index;

                  updateNavigation(
                    index
                  );

                }

              }

            }
          );

        },
        {
          threshold: 0.6
        }
      );


    slides.forEach(
      slide => observer.observe(slide)
    );


    // Initial state

    updateNavigation(0);

  }

);

