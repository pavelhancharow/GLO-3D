const slider = () => {
  const slide = document.querySelectorAll('.portfolio-item'),
    slider = document.querySelector('.portfolio-content');

  let currentSlide = 0,
    interval;

  const dotList = () => {
    const dotContainer = document.querySelector('.portfolio-dots');
    slide.forEach(() => {
      let dot = document.createElement('li');
      dot.classList.add('dot');
      dotContainer.append(dot);
    });
    let dot = dotContainer.querySelectorAll('.dot');
    dot[0].classList.add('dot-active');
    return dot;
  };

  const dot = dotList();

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');

    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }

    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');
  };

  const startSlide = (time = 2000) => {
    interval = setInterval(autoPlaySlide, time);
  };
  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.target;

    if (!target.matches('.portfolio-btn, .dot')) {
      return;
    }

    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');

    if (target.matches('#arrow-right')) {
      currentSlide++;
    } else if (target.matches('#arrow-left')) {
      currentSlide--;
    } else if (target.matches('.dot')) {
      dot.forEach((item, index) => {
        if (item === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }

    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');

  });

  slider.addEventListener('mouseover', (e) => {
    if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
      stopSlide();
    }
  });
  slider.addEventListener('mouseout', (e) => {
    if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
      startSlide();
    }
  });

  startSlide(1500);

};

export default slider;