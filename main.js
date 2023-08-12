document.addEventListener('DOMContentLoaded', function() {
    let dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            let contentId = this.getAttribute('data-content-id');
            if (contentId) {
                loadContent(contentId);
            }
        });
    });
  });
  
  document.addEventListener('click', function (event) {
      const isDropdownItem = event.target.closest('.dropdown-item');
      if (isDropdownItem) {
          const navbarMenu = document.querySelector('.navbar-collapse');
          if (navbarMenu && navbarMenu.classList.contains('show')) {
              navbarMenu.classList.remove('show');
          }
      }
  });
  
  function loadRandomContent() {
      loadContent('random');
  }
  
  function loadContent(contentId) {
      fetch('loadContentFromServer.php?id=' + contentId)
          .then(response => {
              if (!response.ok) { 
                  throw new Error(response.statusText); 
              }
              return response.json();
          })
          .then(data => {
              document.getElementById('main-content').innerHTML = data.content;
  
              document.querySelector('.navbar-brand').textContent = data.title;
  
              // Add more functionality if needed
          })
          .catch(error => {
              console.error("Error fetching content: ", error);
              document.getElementById('main-content').innerHTML = "Error loading content. Please try again later.";
          });
  }
