const userEntry = document.getElementById('user-entry');
const itemButton = document.getElementById('item-button');
const listArea = document.querySelector('.item-list');
const buttonArea = document.querySelector('.button-list');

let itemCount = 0;

// Start listening for events by listening for clicks or enter key
itemButton.addEventListener('click', addListItem);
userEntry.addEventListener('submit', addListItem);

function addListItem (evt) {
	evt.preventDefault();
	let whitespace = /^[\s][a-zA-Z0-9_\s-]+$/g;

	let listDiv = document.createElement('div');
	let buttonDiv = document.createElement('div');
	listDiv.setAttribute('class', `item-${itemCount}`);
	buttonDiv.setAttribute('class', `item-${itemCount}-buttons`);

	// if user doesn't enter anything, stop
	if (!userEntry.value) {
		return;
	}

	// if user enters a space at the beginning with text following, truncate whitespace
	if (whitespace.test(userEntry.value)) {
		userEntry.value = userEntry.value.trim();
	}

	// set new item's text value to be what the user entered, and increment counter variable
	listDiv.innerText = userEntry.value;
	itemCount++;

	// add buttons for the item
	addListItemButtons(buttonDiv);

	// append both the item's name and the item's buttons to the divs in the display area
	listArea.appendChild(listDiv);
	buttonArea.appendChild(buttonDiv);
	userEntry.value = '';
	userEntry.focus();

	// call event listeners for each button
	editItemListener(listDiv, buttonDiv);
	completeItemListener(listDiv, buttonDiv);
	deleteItemListener(listDiv, buttonDiv);
}

function addListItemButtons (item) {
	// let buttonDiv = document.createElement('div');
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

function editItemListener (listDiv, buttonDiv) {
	buttonDiv.children[1].addEventListener('click', () => {
		let flyInput = makeEdit(listDiv, buttonDiv);

		flyInput.addEventListener('keyup', () => {
			if (flyInput.value === '') {
				listDiv.children[1].setAttribute('disabled', true);
			}
			else {
				listDiv.children[1].removeAttribute('disabled');
			}
		});

		listDiv.children[1].addEventListener('click', () => {
			saveEdit(listDiv, buttonDiv, flyInput);
		});
	});
}

function makeEdit (listDiv, buttonDiv) {
	let initialText = listDiv.firstChild.textContent;
	buttonDiv.children[0].setAttribute('disabled', true);
	buttonDiv.children[1].setAttribute('disabled', true);

	let flyInput = document.createElement('input');
	flyInput.setAttribute('class', 'fly-input');
	flyInput.setAttribute('value', initialText);

	let flyButton = document.createElement('button');
	flyButton.setAttribute('class', 'fly-button');
	flyButton.innerText = 'Confirm';

	listDiv.removeChild(listDiv.firstChild);
	listDiv.append(flyInput);
	listDiv.append(flyButton);
	flyInput.focus();
	flyInput.setSelectionRange(initialText.length, initialText.length);

	return flyInput;
}

function saveEdit (listDiv, buttonDiv, input) {
	let initialText = input.value;
	listDiv.removeChild(listDiv.firstChild);
	listDiv.removeChild(listDiv.lastChild);
	listDiv.append(initialText);

	buttonDiv.children[0].removeAttribute('disabled');
	buttonDiv.children[1].removeAttribute('disabled');
}

function completeItemListener (listDiv, buttonDiv) {
	buttonDiv.children[0].addEventListener('click', () => {
		// Select the item
		let specificItem = document.querySelector(`.${listDiv.classList[0]}`);

		// toggle CSS class to turn strikethrough on or off accordingly
		specificItem.classList.toggle('toggle-text');

		// If .toggle-text is currently applied, make inner text of complete button different
		// Else, leave inner text as is
		if (specificItem.classList.length === 2) {
			buttonDiv.children[0].innerText = 'Undo';
			buttonDiv.children[1].setAttribute('disabled', true);
		}
		else {
			buttonDiv.children[0].innerText = 'Completed';
			buttonDiv.children[1].removeAttribute('disabled');
		}
	});
}

function deleteItemListener (listDiv, buttonDiv) {
	buttonDiv.children[2].addEventListener('click', () => {
		// query for list/button areas and specific item passed to function; remove item from area.
		let childItem = document.querySelector(`.${listDiv.classList[0]}`);
		let childButtons = document.querySelector(
			`.${listDiv.classList[0]}-buttons`
		);

		// remove children from their parent display areas
		listArea.removeChild(childItem);
		buttonArea.removeChild(childButtons);
	});
}

// function styleItem () {
// 	listItem.classList.add('item-style');
// }
