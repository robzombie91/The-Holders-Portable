document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const contentId = item.getAttribute('data-content-id');
      if (contentId) loadContent(contentId);
    });
  });

  document.addEventListener('click', event => {
    if (event.target.closest('.dropdown-item')) {
      const navbarMenu = document.querySelector('.navbar-collapse');
      if (navbarMenu && navbarMenu.classList.contains('show')) navbarMenu.classList.remove('show');
    }
  });
});

function loadRandomContent() {
  loadContent('random');
}

function loadContent(contentId) {
  const mainContent = document.getElementById('main-content');
  mainContent.style.opacity = 0;

  fetch(`loadContentFromServer.php?id=${contentId}`)
  .then(response => {
    if (!response.ok) throw new Error(response.statusText);
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
const searchBox = document.getElementById('search-box');
let typeaheadDropdown = null;
let selectedIndex = -1;

searchBox.addEventListener('input', function () {
  if (this.value.trim().length === 0) {
    removeTypeaheadDropdown();
    return;
  }

  fetch(`loadContentFromServer.php?search=${this.value.trim()}`)
  .then(response => response.json())
  .then(data => {
    removeTypeaheadDropdown();
    if (data.length > 0) {
      typeaheadDropdown = document.createElement('div');
      typeaheadDropdown.className = 'typeahead-dropdown';
      data.forEach((item, index) => {
        const anchor = document.createElement('a');
        anchor.textContent = item.title;
        anchor.setAttribute('data-content-id', item.id);
        anchor.addEventListener('click', () => {
          loadContent(anchor.getAttribute('data-content-id'));
          removeTypeaheadDropdown();
        });
        anchor.addEventListener('mouseover', () => setSelectedIndex(index));
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
    if (selectedIndex !== -1) items[selectedIndex].classList.remove('selected');
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
searchBox.addEventListener('keydown', event => {
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
      if (selectedIndex !== -1) items[selectedIndex].click();
    }
  }
});

document.addEventListener('click', event => {
  if (!searchBox.contains(event.target)) removeTypeaheadDropdown();
});

document.addEventListener('click', event => {
  if (event.target.closest('.typeahead-dropdown')) {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show') || !navbarToggler.classList.contains('collapsed')) navbarToggler.click();
    window.scrollTo(0, 0);
    searchBox.value = '';
  }
});

function showSubmissionForm() {
  document.getElementById('submissionForm').style.display = 'block';
}

document.getElementById('articleSubmissionForm').addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);

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
