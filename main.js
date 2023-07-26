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
  
    })
    .catch(error => console.error('Error:', error));
  }
  