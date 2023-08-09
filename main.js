if (window.innerWidth < 576) {
  const elements = document.querySelectorAll('h1, h2, p');
  elements.forEach(element => {
      element.style.fontSize = '1.2rem';
  });
}

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


function loadContent(contentId) {
    fetch('loadContentFromServer.php?id=' + contentId)
        .then(response => {
            if (!response.ok) { 
                throw new Error(response.statusText); 
            }
            return response.json(); // Parsing the response as JSON instead of text since we updated the PHP to send JSON
        })
        .then(data => {
            document.getElementById('main-content').innerHTML = data.content;

            // Update the navbar brand title
            document.querySelector('.navbar-brand').textContent = data.title;

            // Container for the navigation links
            let navLinks = "<div style='margin-top: 20px;'>";  // adding a margin for spacing

            // Previous link
            if (contentId > 1) {
                const prevId = parseInt(contentId) - 1;
                navLinks += `<a href="javascript:void(0);" onclick="loadContent('${prevId}');">Previous</a>`;
            }

            // Append the next link
            const nextId = parseInt(contentId) + 1;
            navLinks += ` <a href="javascript:void(0);" onclick="loadContent('${nextId}');">Next</a>`;
            
            // Close the container div
            navLinks += "</div>";

            document.getElementById('main-content').innerHTML += navLinks;

            // Scroll to the top of the page
            window.scrollTo(0, 0);
        })
        .catch(error => {
            document.getElementById('main-content').innerHTML = "The Holder you're looking for wasn't found. Keep on searching if you have the fortitude.";
        });
}
