const userEntry = document.getElementById('user-entry');
const itemButton = document.getElementById('item-button');
const listArea = document.querySelector('.content-main');

let itemCount = 0;

// Start listening for events by listening for clicks or enter key
itemButton.addEventListener('click', addListItem);
userEntry.addEventListener('submit', addListItem);

function addListItem (evt) {
	evt.preventDefault();
	let whitespace = /^[\s][a-zA-Z0-9_\s-]+$/g;

	let listItem = document.createElement('div');
	listItem.setAttribute('class', `item-${itemCount}`);

	// if user doesn't enter anything, stop
	if (!userEntry.value) {
		return;
	}

	// if user enters a space at the beginning with text following, truncate whitespace
	if (whitespace.test(userEntry.value)) {
		userEntry.value = userEntry.value.trim();
	}

	// set new item's text value to be what the user entered, and increment counter variable
	listItem.innerText = userEntry.value;
	itemCount++;

	// add buttons for the item, append it to the list, and then refocus the input field.
	addListItemButtons(listItem);
	listArea.appendChild(listItem);
	userEntry.value = '';
	userEntry.focus();

	// call event listeners for each button
	editItemListener(listItem);
	completeItemListener(listItem);
	deleteItemListener(listItem);
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

function completeItemListener (item) {
	item.childNodes[1].addEventListener('click', () => {
		// Select the item
		let specificItem = document.querySelector(`.${item.classList[0]}`);

		// toggle CSS class to turn strikethrough on or off accordingly
		specificItem.classList.toggle('toggle-text');

		// If .toggle-text is currently applied, make inner text of complete button different
		// Else, leave inner text as is
		if (specificItem.classList.length === 2) {
			item.childNodes[1].innerText = 'Undo';
		}
		else {
			item.childNodes[1].innerText = 'Completed';
		}
	});
}

function deleteItemListener (item) {
	item.childNodes[3].addEventListener('click', () => {
		// query for list area and specific item passed to function; remove item from area.
		let mainContent = document.getElementsByClassName('content-main');
		let child = document.querySelector(`.${item.classList[0]}`);
		mainContent[0].removeChild(child);
	});
}

// function styleItem () {
// 	listItem.classList.add('item-style');
// }
