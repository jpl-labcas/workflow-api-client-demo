document.addEventListener('DOMContentLoaded', function() {
  fetch('README.md')
    .then(response => {
      if (!response.ok) throw new Error('Could not load README.md');
      return response.text();
    })
    .then(text => {
      document.getElementById('readme-content').textContent = text;
    })
    .catch(err => {
      document.getElementById('readme-content').textContent = 'Error loading README.md: ' + err.message;
    });
}); 