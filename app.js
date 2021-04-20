const userEntry = document.getElementById('user-entry');
const itemButton = document.getElementById('item-button');
const listArea = document.querySelector('.content-main');

itemButton.addEventListener('click', addListItem);

function addListItem (evt) {
	let listItem = document.createElement('div');
	listItem.innerText = userEntry.value;
	listItem.classList.add('item-style');
	listArea.appendChild(listItem);
	clearTextField();
	userEntry.focus();
}

function clearTextField () {
	userEntry.value = '';
}
