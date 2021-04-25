let userEntry = document.getElementById('user-entry');
let itemButton = document.getElementById('item-button');
let listArea = document.querySelector('.item-list');
let buttonArea = document.querySelector('.button-list');

let itemCount = 0;

// Start listening for events by listening for clicks or enter key
itemButton.addEventListener('click', addListItem);
userEntry.addEventListener('submit', addListItem);

// Ensure that user entry prohibits empty or whitespace submissions
userEntry.addEventListener('keyup', () => {
	if (userEntry.value.trim() === '') {
		itemButton.setAttribute('disabled', true);
	}
	else {
		itemButton.removeAttribute('disabled');
	}
});

function addListItem (evt, list) {
	evt.preventDefault();

	let listDiv = document.createElement('li');
	let buttonDiv = document.createElement('div');
	listDiv.setAttribute('class', `item-${itemCount}`);
	buttonDiv.setAttribute('class', `item-${itemCount}-buttons`);

	// set new item's text value to be what the user entered, and increment counter variable
	listDiv.innerText = userEntry.value.trim();
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
	let completeButton = document.createElement('button');
	let editButton = document.createElement('button');
	let deleteButton = document.createElement('button');

	completeButton.setAttribute('class', 'complete-button');
	editButton.setAttribute('class', 'edit-button');
	deleteButton.setAttribute('class', 'delete-button');

	item.appendChild(completeButton);
	item.appendChild(editButton);
	item.appendChild(deleteButton);
}

function editItemListener (listDiv, buttonDiv) {
	// when the selected item's edit button is clicked, call makeEdit() on the item and store it in a variable
	buttonDiv.children[1].addEventListener('click', () => {
		let flyInput = makeEdit(listDiv, buttonDiv);

		// listen for keyups on user's entries into input field; disable submit button if blank
		flyInput.addEventListener('keyup', () => {
			if (flyInput.value.trim() === '') {
				listDiv.children[1].setAttribute('disabled', true);
			}
			else {
				listDiv.children[1].removeAttribute('disabled');
			}
		});

		// when submit button is clicked, save entry by calling saveEdit() on the item
		listDiv.children[1].addEventListener('click', () => {
			saveEdit(listDiv, buttonDiv, flyInput);
		});
	});
}

function makeEdit (listDiv, buttonDiv) {
	// store the initial text of the item in a variable
	let initialText = listDiv.firstChild.textContent;
	buttonDiv.children[0].setAttribute('disabled', true);
	buttonDiv.children[1].setAttribute('disabled', true);

	// create an input box dynamically
	let flyInput = document.createElement('input');
	flyInput.setAttribute('class', 'fly-input');
	flyInput.setAttribute('value', initialText);

	// create a submit button dynamically
	let flyButton = document.createElement('button');
	flyButton.setAttribute('class', 'fly-button');

	// remove the pre-existing text; append the new input field and submit button
	listDiv.removeChild(listDiv.firstChild);
	listDiv.append(flyInput);
	listDiv.append(flyButton);
	flyInput.focus();
	flyInput.setSelectionRange(initialText.length, initialText.length);

	return flyInput;
}

function saveEdit (listDiv, buttonDiv, input) {
	// remove the input field and the submit button and replace it with the user's new text
	let newText = input.value.trim();
	listDiv.removeChild(listDiv.firstChild);
	listDiv.removeChild(listDiv.lastChild);
	listDiv.append(newText);

	buttonDiv.children[0].removeAttribute('disabled');
	buttonDiv.children[1].removeAttribute('disabled');
}

function completeItemListener (listDiv, buttonDiv) {
	buttonDiv.children[0].addEventListener('click', () => {
		// Select the item
		let specificItem = document.querySelector(`.${listDiv.classList[0]}`);

		// toggle CSS class to turn strikethrough on or off accordingly
		specificItem.classList.toggle('toggle-text');
		buttonDiv.children[0].classList.toggle('change-icon');

		// If .toggle-text is currently applied, disable edit button
		if (specificItem.classList.length === 2) {
			buttonDiv.children[1].setAttribute('disabled', true);
		}
		else {
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
