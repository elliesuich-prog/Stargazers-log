// Fetch and render the starred repositories
async function fetchAndRenderRepositories() {
  const container = document.getElementById('repositories-container');
  
  try {
    // Fetch the events.json file
    const response = await fetch('events.json');
    
    if (!response.ok) {
      throw new Error('Failed to load repositories data');
    }
    
    const repositories = await response.json();
    
    // Clear the loading message
    container.innerHTML = '';
    
    // Create a list container
    const list = document.createElement('div');
    list.className = 'repositories-list';
    
    // Render each repository as a card
    repositories.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'repository-card';
      
      const title = document.createElement('h2');
      title.textContent = repo.name;
      
      const link = document.createElement('a');
      link.href = repo.url;
      link.target = '_blank';
      link.textContent = repo.url;
      
      const description = document.createElement('p');
      description.textContent = repo.description;
      
      const date = document.createElement('p');
      date.className = 'starred-date';
      date.textContent = `Starred on: ${new Date(repo.starredDate).toLocaleDateString()}`;
      
      // Append elements to card
      card.appendChild(title);
      card.appendChild(link);
      card.appendChild(description);
      card.appendChild(date);
      
      // Add card to list
      list.appendChild(card);
    });
    
    // Add list to container
    container.appendChild(list);
  } catch (error) {
    container.innerHTML = `<div class="error">Error loading repositories: ${error.message}</div>`;
    console.error('Error:', error);
  }
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', fetchAndRenderRepositories);
