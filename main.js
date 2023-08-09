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
                navLinks += `<a href="javascript:void(0);" onclick="loadContent('${prevId}');">Previous Object</a> |`;
            }

            // Append the next link
            const nextId = parseInt(contentId) + 1;
            navLinks += ` <a href="javascript:void(0);" onclick="loadContent('${nextId}');">Next Object</a>`;
            
            // Close the container div
            navLinks += "</div>";

            document.getElementById('main-content').innerHTML += navLinks;

            // Scroll to the top of the page
            window.scrollTo(0, 0);
        })
        .catch(error => {
            document.getElementById('main-content').innerHTML = "In any city, in any country, go to any data center or server farm you can get yourself into. When you reach the front desk, ask to visit The Holder of the 404. A shiver will pass through the worker as if they've felt a ghostly touch. They'll nod, leading you to an elevator that wasn't there before. As the elevator descends, it will grow colder. Your breath will frost, and you'll hear the faint, distorted echo of data streams. You'll descend far deeper than the building should allow. When the doors open, you'll find yourself in a vast chamber, with servers of all ages stretching as far as the eye can see, their LEDs blinking like a sea of stars. At the center will be an ancient terminal, its display flickering with a greenish hue. To reach it, you'll need to cross a bridge made of network cables. Below the bridge, an abyss of darkness swirls, echoing with the screams of those who sought the 404 and failed. As you walk, ghostly figures of past system administrators will materialize, attempting to drag you into the abyss with tales of corrupted data, lost connections, and server failures. You must not listen to their lamentations. Keep your focus solely on the terminal. Upon reaching the terminal, type: REQUEST 404. The screen will blink, then display: Complete the Circuit to Continue. A sharp, electric pain will shoot through your body, as if you're being asked to become one with the machine. Hold onto the terminal, and let the current flow through you. It will feel as if your very soul is being uploaded, bit by bit. Survive this digital trial, and the current will cease. The screen will then read, 404 - Not Found. Turning around, you'll see the ancient system administrator, cables and wires threaded through his being. He will hold out to you a transparent box containing a pulsating error symbol. Lost things always seek to be found, he'll murmur. But some gaps are not meant to be bridged. Accept the box. Close your eyes and when you open them, you'll be outside the data center, the weight of Item #2000 heavy in your hands. Guard it, for it's not just an error but a void, a missing link that could undo reality itself.";
            document.querySelector('.navbar-brand').textContent = "The Holder of 404"; // Updating the navbar title
        });
}