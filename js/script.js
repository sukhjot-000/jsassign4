document.addEventListener('DOMContentLoaded', function() {
  const studentDiv = document.querySelector('.info');
    // Setting the text content of the student element
  studentDiv.textContent = 'Sukhjot Singh \n 200551715'; 

    // Adding event listener to the button for fetching jokes
  document.getElementById('fetchJokesBtn').addEventListener('click', function() {
        // Getting the selected joke category and amount from dropdowns
    const selectedCategory = document.getElementById('categorySelect').value;
    const selectedAmount = document.getElementById('amountSelect').value;
    const jokeContainer = document.getElementById('jokeContainer');
    
    // Fetching jokes from the API
    fetch(`https://v2.jokeapi.dev/joke/${selectedCategory}?amount=${selectedAmount}`)
        .then(response => response.json())
        .then(data => {
            jokeContainer.innerHTML = '';
            const jokes = data.jokes;

            jokes.forEach(joke => {
                const jokeElement = document.createElement('div');
                jokeElement.classList.add('joke');

                // Checking if the joke type is twopart or single
                if (joke.type === 'twopart') {
                    jokeElement.innerHTML = `
                        <p><strong>Category:</strong> ${joke.category}</p>
                        <p><strong>Type:</strong> ${joke.type}</p>
                        <p><strong>ID:</strong> ${joke.id}</p>
                        <p>${joke.setup}</p>
                        <p>${joke.delivery}</p>
                    `;
                } else if (joke.type === 'single') {
                    jokeElement.innerHTML = `
                        <p><strong>Category:</strong> ${joke.category}</p>
                        <p><strong>Type:</strong> ${joke.type}</p>
                        <p><strong>ID:</strong> ${joke.id}</p>
                        <p>${joke.joke}</p>
                    `;
                }
                // Adding CSS classes based on joke flags and selected category
                if (joke.flags.explicit) {
                    jokeElement.classList.add('explicit');
                }

                if (selectedCategory === 'Dark') {
                    jokeElement.classList.add('dark');
                } else if (selectedCategory === 'Pun') {
                    jokeElement.classList.add('pun');
                }

                                // Appending the joke element to the joke container
                jokeContainer.appendChild(jokeElement);
            });
        })
        // Catching any errors that occur during the fetch operation
        .catch(error => console.error('Error fetching jokes:', error));
});
});
