document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form submission
  
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const contentSections = document.querySelectorAll('section, p, h1, h2, h3, h5'); // Select relevant content sections
  
    let found = false;
    let firstMatchElement = null;
  
    contentSections.forEach(section => {
      const sectionText = section.textContent.toLowerCase();
  
      // Reset previous highlights
      section.innerHTML = section.innerHTML.replace(/<span class="highlight">|<\/span>/g, '');
  
      if (sectionText.includes(searchInput)) {
        // Highlight all occurrences of the search term in the content
        const regex = new RegExp(`(${searchInput})`, 'gi');
        section.innerHTML = section.innerHTML.replace(regex, '<span class="highlight">$1</span>');
  
        if (!firstMatchElement) {
          firstMatchElement = section;
        }
  
        found = true;
      }
    });
  
    if (!found) {
      showNotification('No matching content found!');
    } else {
      if (firstMatchElement) {
        firstMatchElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstMatchElement.classList.add('highlight');
        setTimeout(() => {
          firstMatchElement.classList.remove('highlight');
        }, 1000); // Remove the highlight class after the animation completes
      }
    }
  });
  
  function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    const progressBar = document.getElementById('progressBar');
  
    notificationMessage.textContent = message;
    notification.style.display = 'block';
    notification.classList.add('show');
    progressBar.style.width = '100%';
  
    setTimeout(() => {
      progressBar.style.width = '0%';
    }, 100); // Start the progress bar animation
  
    setTimeout(() => {
      notification.classList.remove('show');
      notification.classList.add('hide');
    }, 3000); // Slide out after 3 seconds
  
    setTimeout(() => {
      notification.style.display = 'none';
      notification.classList.remove('hide');
    }, 3500); // Hide completely after the slide-out animation
  }
 
  function showToast(event) {
    event.preventDefault(); // Prevent default form submission

    // Simulating form submission process
    const toast = document.getElementById('toast');
    toast.classList.remove('hidden');
    toast.classList.add('bounce', 'show');

    // Optionally reset the form fields
    document.getElementById('contactForm').reset();

    // Hide the toast notification after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');

        // Start the hide animation
        toast.classList.add('hide');

        // Wait for the animation to finish before hiding completely
        setTimeout(() => {
            toast.classList.add('hidden'); // Finally hide it
            toast.classList.remove('hide'); // Reset hide class for next use
            toast.classList.remove('bounce'); // Reset bounce class for next use
        }, 500); // Match this time with the CSS transition duration
    }, 3000);
}


//faq functionality
const faqItems = document.querySelectorAll('.faq_item');

faqItems.forEach(item => {
  const questionBtn = item.querySelector('.faq_question');

  questionBtn.addEventListener('click', () => {
    const answer = item.querySelector('.faq_answer');
    const icon = questionBtn.querySelector('i');

    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    icon.classList.toggle('rotate-icon');
  });
});