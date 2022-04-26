const addItemsForm = document.querySelector('.add-items-form');
const itemsList = document.querySelector('.items-list');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
  e.preventDefault();
  // console.log(e.target.item.value);

  const text = e.target.item.value;
  const item = {
    text : text, 
    checked: false,
  }

  items.push(item);
  localStorage.setItem('items', JSON.stringify(items))
  displayItems(items, itemsList);
  this.reset();
}

function displayItems(ingredients, ingredientsList) {
  ingredientsList.innerHTML = ingredients.map((ingredient, index) => {
    return `<li>
      <input type="checkbox" id="item${index}" data-index="${index}" ${ingredient.checked ? 'checked' : ''}/>
      <label for="item${index}">${ingredient.text}</label>
      </li>`;
  }).join('');
}

function toggleClick(e) {
  if (!e.target.matches('input')) return;
  const element = e.target.dataset.index;
  items[element].checked = !items[element].checked;
  localStorage.setItem('items', JSON.stringify(items));
  displayItems(items, itemsList);
}

addItemsForm.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleClick);
displayItems(items, itemsList);