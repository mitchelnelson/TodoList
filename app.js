const userEntry = document.getElementById('user-entry');
const itemButton = document.getElementById('item-button');
const listArea = document.querySelector('.content-main');
let itemSibling = document.querySelector('.content-main div');

let itemCount = 0;

itemButton.addEventListener('click', addListItem);

function addListItem (evt) {
	let listItem = document.createElement('div');
	listItem.setAttribute('class', `item-${itemCount}`);
	listItem.innerText = userEntry.value;

	itemCount++;

	addListItemButtons(listItem);
	listArea.appendChild(listItem);
	userEntry.value = '';
	userEntry.focus();

	itemSibling = itemSibling.nextElementSibling;
	editItemListener(itemSibling);
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

function editItemListener (item) {
	item.childNodes[2].addEventListener('click', () => {
		// Save initial text entry; disable the complete button; rename the edit button;
		let initialText = item.childNodes[0].textContent;
		item.childNodes[1].setAttribute('disabled', true);
		item.childNodes[2].innerText = 'Save';

		// Create new input box
		let flyInput = document.createElement('input');
		flyInput.setAttribute('id', 'fly-input');
		flyInput.setAttribute('value', initialText);

		// Remove the previous text for the item and replace it with an input field
		item.removeChild(item.childNodes[0]);
		item.prepend(flyInput);

		// autofocus and set cursor to the end of the previous text
		document.getElementById('fly-input').focus();
		document
			.getElementById('fly-input')
			.setSelectionRange(initialText.length, initialText.length);

		// add new event listener to save the new input
		item.childNodes[2].addEventListener('click', () => {
			if (flyInput.value) {
				// store the user's new input in a variable, remove the input field, and replace text
				let newText = flyInput.value;
				item.removeChild(item.childNodes[0]);
				item.prepend(newText);

				// Restore the buttons and listen for edits again (i.e. save)
				item.childNodes[1].removeAttribute('disabled');
				item.childNodes[2].innerText = 'Edit';
				editItemListener(item);
			}
		});
	});
}

// function styleItem () {
// 	listItem.classList.add('item-style');
// }
