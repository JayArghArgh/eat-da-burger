// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
	if (event) {
		console.info('DOM loaded');
	}

	// UPDATE
	const changeStatusBtns = document.querySelectorAll('.change-status');

	// Set up the event listener for the create button
	if (changeStatusBtns) {
		changeStatusBtns.forEach((button) => {
			button.addEventListener('click', (e) => {
				// Grabs the id of the element that goes by the name, "id"
				const id = e.target.getAttribute('data-id');
				let newStatus = e.target.getAttribute('data-newsleep');
				if (newStatus === "true") {
					newStatus = 0;
				} else {
					newStatus = 1;
				}
				const devoured = {
					devoured: newStatus,
				};

				fetch(`/api/burgers/${id}`, {
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},

					// make sure to serialize the JSON body
					body: JSON.stringify(devoured),
				}).then((response) => {
					// Check that the response is all good
					// Reload the page so the user can see the new quote
					if (response.ok) {
						location.reload('/');
					} else {
						alert('something went wrong!');
					}
				});
			});
		});
	}

	// CREATE
	const createBurgerBtn = document.getElementById('create-form');

	if (createBurgerBtn) {
		createBurgerBtn.addEventListener('submit', (e) => {
			e.preventDefault();

			// Grabs the value of the textarea that goes by the name, "quote"
			const newBurger = {
				burger_name: document.getElementById('ca').value.trim(),
				// devoured: document.getElementById('devoured').checked,
			};

			// Send POST request to create a new quote
			fetch('/api/burgers', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},

				// make sure to serialize the JSON body
				body: JSON.stringify(newBurger),
			}).then(() => {
				// Empty the form
				document.getElementById('ca').value = '';

				// Reload the page so the user can see the new burger
				location.reload();
			});
		});
	}

	// DELETE
	const deleteBurgerBtns = document.querySelectorAll('.delete-burger');

	// Set up the event listeners for each delete button
	deleteBurgerBtns.forEach((button) => {
		button.addEventListener('click', (e) => {
			const id = e.target.getAttribute('data-id');
			// Send the delete request
			fetch(`/api/burgers/${id}`, {
				method: 'DELETE',
			}).then((res) => {
				// Reload the page
				location.reload();
			});
		});
	});
});
