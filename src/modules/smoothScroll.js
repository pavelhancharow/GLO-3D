const smoothScroll = () => {
  const anchor = document.querySelectorAll('ul li a[href*="#"], [href="#service-block"]');
  if (document.documentElement.clientWidth > 768) {
    anchor.forEach(item => item.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(item.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }));
  }
};

export default smoothScroll;