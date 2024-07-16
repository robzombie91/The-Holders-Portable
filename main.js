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
    const mainContent = document.getElementById('main-content');
    mainContent.style.opacity = 0;
  
    fetch('loadContentFromServer.php?id=' + contentId)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        mainContent.innerHTML = data.content;
        
        setTimeout(() => {
          mainContent.style.transition = 'opacity 0.5s';
          mainContent.style.opacity = 1;
        }, 100);
  
        document.querySelector('.navbar-brand').textContent = data.title;
  
        window.scrollTo(0, 0);
        searchBox.value = '';
      })
      .catch(error => {
        console.error("Error fetching content: ", error);
        mainContent.innerHTML = "Error loading content. Please try again later.";
        mainContent.style.opacity = 1;
      });
  }

// Typeahead Functionality
// Typeahead Functionality
let searchBox = document.getElementById('search-box');
let typeaheadDropdown = null;
let selectedIndex = -1;

searchBox.addEventListener('input', function() {
  if (this.value.trim().length === 0) {
    removeTypeaheadDropdown();
    return;
  }

  fetch('loadContentFromServer.php?search=' + this.value.trim())
    .then(response => response.json())
    .then(data => {
      removeTypeaheadDropdown();
      if (data.length > 0) {
        typeaheadDropdown = document.createElement('div');
        typeaheadDropdown.className = 'typeahead-dropdown';
        data.forEach((item, index) => {
          let anchor = document.createElement('a');
          anchor.textContent = item.title;
          anchor.setAttribute('data-content-id', item.id);
          anchor.addEventListener('click', function() {
            loadContent(this.getAttribute('data-content-id'));
            removeTypeaheadDropdown();
          });
          anchor.addEventListener('mouseover', function() {
            setSelectedIndex(index);
          });
          typeaheadDropdown.appendChild(anchor);
        });
        searchBox.parentElement.appendChild(typeaheadDropdown);
        typeaheadDropdown.style.display = 'block';
      } else {
        showNoResultsMessage();
      }
    })
    .catch(error => {
      console.error('Error fetching search results:', error);
    });
});

function removeTypeaheadDropdown() {
  if (typeaheadDropdown) {
    typeaheadDropdown.remove();
    typeaheadDropdown = null;
    selectedIndex = -1;
  }
}

function setSelectedIndex(index) {
  if (typeaheadDropdown) {
    const items = typeaheadDropdown.getElementsByTagName('a');
    if (selectedIndex !== -1) {
      items[selectedIndex].classList.remove('selected');
    }
    selectedIndex = index;
    items[selectedIndex].classList.add('selected');
  }
}

function showNoResultsMessage() {
  typeaheadDropdown = document.createElement('div');
  typeaheadDropdown.className = 'typeahead-dropdown';
  const message = document.createElement('p');
  message.textContent = 'No results found.';
  typeaheadDropdown.appendChild(message);
  searchBox.parentElement.appendChild(typeaheadDropdown);
  typeaheadDropdown.style.display = 'block';
}

// Keyboard navigation for typeahead dropdown
searchBox.addEventListener('keydown', function(event) {
  if (typeaheadDropdown) {
    const items = typeaheadDropdown.getElementsByTagName('a');
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((selectedIndex + 1) % items.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (selectedIndex !== -1) {
        items[selectedIndex].click();
      }
    }
  }
});

// Close typeahead dropdown on clicking outside
document.addEventListener('click', function(event) {
  if (!searchBox.contains(event.target)) {
    removeTypeaheadDropdown();
  }
});

// Close typeahead dropdown on clicking outside
document.addEventListener('click', function(event) {
    if (!searchBox.contains(event.target)) {
        removeTypeaheadDropdown();
    }
});

// Collapse navbar and scroll to top when a link from search dropdown is clicked
document.addEventListener('click', function(event) {
    if (event.target.closest('.typeahead-dropdown')) {
        let navbarToggler = document.querySelector('.navbar-toggler');
        let navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show') || !navbarToggler.classList.contains('collapsed')) {
            navbarToggler.click();
        }
        window.scrollTo(0, 0);
    // Clear the search box
    searchBox.value = '';

    }
});

function showSubmissionForm() {
  document.getElementById('submissionForm').style.display = 'block';
}

document.getElementById('articleSubmissionForm').addEventListener('submit', function(e) {
  e.preventDefault();

  let formData = new FormData(this);

  fetch('submit_article.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Thank you for your submission. It will be reviewed shortly.');
      document.getElementById('submissionForm').style.display = 'none';
    } else {
      alert('There was an error submitting your article. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error submitting your article. Please try again.');
  });
});
 
