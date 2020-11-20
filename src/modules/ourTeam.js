const ourTeam = () => {
  const commandPhoto = document.querySelectorAll('.command__photo');

  commandPhoto.forEach(item => {
    const imgSrc = item.getAttribute('src');
    item.addEventListener('mouseover', (e) => e.target.src = e.target.dataset.img);
    item.addEventListener('mouseout', (e) => e.target.src = imgSrc);
  });
};

export default ourTeam;