//
// Dropdown Select
//

function setDropdownSelect(dropdowns, callback) {
	dropdowns.forEach(dropdown => {
		const btn = dropdown.querySelector('.dropdown-toggle');
		const menu = dropdown.querySelectorAll('.dropdown-item');
		const multiple = btn.dataset.multiple === undefined ? false : true;
		const default_title = btn.innerHTML;
		let values = [],
			titles = [];
		menu.forEach(item => {
			item.addEventListener('click', e => {
				e.preventDefault();

				if (multiple) {
					if (item.classList.contains('active')) {
						item.classList.remove('active');
					} else {
						item.classList.add('active');
					}
					let empty = false;
				} else {
					menu.forEach(i => i.classList.remove('active'));
					item.classList.add('active');
				}

				if (dropdown.querySelector('input')) {
					if (multiple) {
						const input = dropdown.querySelector('input');
						let value = [],
							title = [];
						menu.forEach(i => {
							if (i.classList.contains('active')) {
								value.push(i.dataset.value);
								title.push(i.innerHTML);
							}
						});
						input.value = value.join(',');
						if (value.length) {
							btn.innerHTML = title.join(', ');
						} else {
							btn.innerHTML = default_title;
						}
					} else {
						dropdown.querySelector('input').value = item.dataset.value;
						btn.innerHTML = item.innerHTML;
					}
				} else {
					dropdown.insertAdjacentHTML('beforeend', '<input type="hidden" name="' + btn.name + '" value="' + item.dataset.value + '">');
					btn.innerHTML = item.innerHTML;
				}

				if (callback !== undefined) {
					callback();
				}
			});
			if (item.classList.contains('active')) {
				values.push(item.dataset.value);
				titles.push(item.innerHTML);
			}
		});
		dropdown.insertAdjacentHTML('beforeend', '<input type="hidden" name="' + btn.name + '" value="' + values.join(',') + '">');
		if (titles.length) {
			btn.innerHTML = titles.join(', ');
		}
	});
}

export default setDropdownSelect;