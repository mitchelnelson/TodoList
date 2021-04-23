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
	listItem.setAttribute('class', `item-${itemCount} item-style`);

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
	let buttonDiv = document.createElement('div');
	let completeButton = document.createElement('button');
	let editButton = document.createElement('button');
	let deleteButton = document.createElement('button');

	completeButton.innerText = 'Completed';
	editButton.innerText = 'Edit';
	deleteButton.innerText = 'Delete';

	buttonDiv.setAttribute('class', 'buttons');

	buttonDiv.appendChild(completeButton);
	buttonDiv.appendChild(editButton);
	buttonDiv.appendChild(deleteButton);
	item.appendChild(buttonDiv);
}

function editItemListener (item) {
	let buttonContainer = item.lastChild;
	buttonContainer.childNodes[1].addEventListener('click', () => {
		// Save initial text entry; disable the complete button; rename the edit button;
		let initialText = item.firstChild.textContent;
		buttonContainer.childNodes[0].setAttribute('disabled', true);
		buttonContainer.childNodes[1].innerText = 'Save';

		// Create new input box
		let flyInput = document.createElement('input');
		flyInput.setAttribute('id', 'fly-input');
		flyInput.setAttribute('value', initialText);

		// Remove the previous text for the item and replace it with an input field
		item.removeChild(item.firstChild);
		item.prepend(flyInput);

		// autofocus and set cursor to the end of the previous text
		document.getElementById('fly-input').focus();
		document
			.getElementById('fly-input')
			.setSelectionRange(initialText.length, initialText.length);

		// add new event listener to save the new input
		buttonContainer.childNodes[1].addEventListener('click', () => {
			if (flyInput.value) {
				// store the user's new input in a variable, remove the input field, and replace text
				let newText = flyInput.value;
				item.removeChild(item.firstChild);
				item.prepend(newText);

				// Restore the buttons and listen for edits again (i.e. save)
				buttonContainer.childNodes[0].removeAttribute('disabled');
				buttonContainer.childNodes[1].innerText = 'Edit';
				editItemListener(item);
			}
		});
	});
}

function completeItemListener (item) {
	let buttonContainer = item.lastChild;
	console.dir(item);
	buttonContainer.childNodes[0].addEventListener('click', () => {
		// Select the item
		let specificItem = document.querySelector(`.${item.classList[0]}`);

		// toggle CSS class to turn strikethrough on or off accordingly
		specificItem.classList.toggle('toggle-text');

		// If .toggle-text is currently applied, make inner text of complete button different
		// Else, leave inner text as is
		if (specificItem.classList.length === 3) {
			buttonContainer.childNodes[0].innerText = 'Undo';
			buttonContainer.childNodes[1].setAttribute('disabled', true);
		}
		else {
			buttonContainer.childNodes[0].innerText = 'Completed';
			buttonContainer.childNodes[1].removeAttribute('disabled');
		}
	});
}

function deleteItemListener (item) {
	let buttonContainer = item.lastChild;
	buttonContainer.childNodes[2].addEventListener('click', () => {
		// query for list area and specific item passed to function; remove item from area.
		let mainContent = document.getElementsByClassName('content-main');
		let child = document.querySelector(`.${item.classList[0]}`);
		mainContent[0].removeChild(child);
	});
}

// function styleItem () {
// 	listItem.classList.add('item-style');
// }
