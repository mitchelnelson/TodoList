const userEntry = document.getElementById('user-entry');
const itemButton = document.getElementById('item-button');
const listArea = document.querySelector('.content-main');

itemButton.addEventListener('click', addListItem);

function addListItem (evt) {
	let listItem = document.createElement('div');
	listItem.innertext = userEntry.value;
	addListItemButtons(listItem);
	listArea.appendChild(listItem);
	userEntry.value = '';
	userEntry.focus();
}

function addListItemButtons (item) {
	let completeButton = document.createElement('button');
	let editButton = document.createElement('button');
	let deleteButton = document.createElement('button');

	completeButton.innerText = 'Completed';
	editButton.innerText = 'Edit';
	deleteButton.innerText = 'Delete';

	item.appendChild(completeButton);
	item.appendChild(editButton);
	item.appendChild(deleteButton);
}

// listItem.classList.add('item-style');
