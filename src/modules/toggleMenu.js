const toggleMenu = () => {
  const menu = document.querySelector('menu');

  document.addEventListener('click', (e) => {
    if (e.target.closest('.menu')) {
      menu.classList.add('active-menu');
    } else if (e.target.matches('.close-btn') || e.target.closest('li>a') || !e.target.closest('menu')) {
      menu.classList.remove('active-menu');
    }
  });
};

export default toggleMenu;