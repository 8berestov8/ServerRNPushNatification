var id = null;

const $user_table = document.querySelector('#user-table');
if ($user_table) {
	$user_table.addEventListener('click', (event) => {
		if (event.target.classList.contains('open-modal')) {
			id = event.target.dataset.id;
		}
	});
}

const $modal = document.querySelector('#modal1');
$modal.addEventListener('click', (event) => {
	if (event.target.classList.contains('send-push')) {
		const title = document.getElementById('title').value;
		const message = document.getElementById('message').value;

		const data = {
			id: id,
			title: title,
			message: message,
		};

		fetch(`/api/find?id=${id}&title=${title}&message=${message}`, data, {
			method: 'GET',
		}).then((response) => {
			return response.text();
		});
	}
});

document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.modal');
	var instances = M.Modal.init(elems);
});
