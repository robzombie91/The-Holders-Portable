  if (window.innerWidth < 576) {
  
    // Select the elements you want to increase font size on  
    const elements = document.querySelectorAll('h1, h2, p');

    // Loop through the elements
    elements.forEach(element => {
    
      // Increase font size  
      element.style.fontSize = '1.2rem';
    
    });
  
  }

  function loadContent(url) {
    fetch(url)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
  
      doc.querySelectorAll("p").forEach(p => {
        p.classList.add("large-text");
      });
  
      // select the main content element
      const mainContent = document.querySelector('#main-content');
      // replace the innerHTML of the main content with the fetched data
      mainContent.innerHTML = doc.body.innerHTML;
  
      // Scroll to the top of the page after loading the content
      window.scrollTo({top: 0, behavior: 'smooth'});
    })
    .catch(error => console.error('Error:', error));
  }
  
  const sidebar = document.getElementById('sidebar');
  const eyeDarkEye = document.querySelector('img[src="images/eye-dark-eye.gif"]');
  const anchorsInSidebar = sidebar.getElementsByTagName('a'); // get all anchor tags in the sidebar
  
  eyeDarkEye.addEventListener('click', () => {
    sidebar.classList.toggle('show');
  });
  
  function hideSidebar() {
    sidebar.classList.remove('show');
  }
  
  // Add event listeners to each anchor tag in the sidebar
  for (let i = 0; i < anchorsInSidebar.length; i++) {
    anchorsInSidebar[i].addEventListener('click', hideSidebar);
  }
