(function(){

  const onDOMContentLoadedOrAfter = callback => {
    // catch if 'DOMContentLoaded' already fired
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  };


  const page = {};

  page.toggleNavigation = () => {
    page.hamburger.addEventListener('click', () => {
      page.hamburger.classList.toggle('is-active');
      page.nav.classList.toggle('visible');

      if(!page.nav.classList.contains('visible')) {
        page.nav.setAttribute('aria-hidden', true);
        page.hamburger.setAttribute('aria-pressed', false);
      } else {
        page.nav.setAttribute('aria-hidden', false);
        page.hamburger.setAttribute('aria-pressed', true);
      }
    });
  }


  page.init = () => {
    page.hamburger = document.querySelector('.hamburger');
    page.nav = document.querySelector('.nav');

    page.scrollHandler();
    page.toggleNavigation();
    page.accordionHandler();
    page.programHandler();
  };

  page.programHandler = () => {
    const etb1 = document.querySelector('.etb-1');
    const etb2 = document.querySelector('.etb-2');
    const table1 = document.querySelector('.event-table1');
    const table2 = document.querySelector('.event-table2');

    const toggleEvents = (selfBtn, selfTable, otherBtn, otherTable) => {
      if(otherBtn.classList.contains('active')) {
        otherBtn.classList.remove('active');
        otherTable.classList.remove('visible');
        selfBtn.classList.add('active');
        selfTable.classList.add('visible');
      }
    }
    etb1.addEventListener('click', toggleEvents.bind(null, etb1, table1, etb2, table2));
    etb2.addEventListener('click', toggleEvents.bind(null, etb2, table2, etb1, table1));
  }


  page.accordionHandler = () => {
    const accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach(accBtn => {
      accBtn.addEventListener("click", () => {
        accBtn.classList.toggle("active");
        const panel = accBtn.nextElementSibling;
        panel.classList.toggle("active");
      });
    });
  }


  page.scrollHandler = () => {
    const header = document.querySelector('.header');
    let scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollPosition > 10) {
      header.classList.add('on-scroll');
    } else {
      header.classList.remove('on-scroll');
    }
    window.addEventListener('scroll', () => {
      scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollPosition > 10) {
        header.classList.add('on-scroll');
      } else {
        header.classList.remove('on-scroll');
      }
    });
  }



  (() => {
    // INSERT JAVASCRIPT HERE!
    // In-view function
    const handleView = item => {
      const linkEl = document.querySelector(`.nav-item-${item}`);

      let offsetHeight = 0.6*(window.innerHeight);
      inView.offset({
        bottom: offsetHeight
      });

      inView(`#${item}`)
        .on("enter", () => linkEl.classList.add('active'))
        .on("exit", el  => linkEl.classList.remove('active'))
    };

  // Apply method on each DOM element
  ["home", "program", "speakers", "venue", "partners", "about"].forEach(handleView);
  })();

  onDOMContentLoadedOrAfter(page.init);

})();


