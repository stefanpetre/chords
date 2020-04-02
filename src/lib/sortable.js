function Sortable(el, options) {
	this.el = el;
	this.body = document.querySelector('body');

	var defaults = {
		childs: /[uo]l/i.test(el.nodeName) ? 'li' : '*',
		onChange: function () {},
		type: 'vertical',
		handle: false
	};

	this.options = Object.assign(defaults, options || {});

	this.el.addEventListener('dragstart', this, false);
	this.el.addEventListener('dragend', this, false);

	this.dropItems = [];

}

Sortable.prototype = {
	constructor: Sortable,
	handleEvent: function (ev) {
		switch (ev.type) {
			case 'dragstart':
				if (this.options.handle) {
					var handle = ev.target.closest(this.options.handle) || ev.target.matches(this.options.handle);
					if (!handle) {
						ev.preventDefault();
					}
				}
				this.dragged = ev.target.closest(this.options.childs);
				ev.dataTransfer.effectAllowed = 'move';
				ev.dataTransfer.setData('Text', 'this.id');
				var items = this.el.querySelectorAll(':scope > ' + this.options.childs);
				var before = true;
				Array.prototype.forEach.call(items, function (el, indx) {
					if (el === this.dragged) {
						this.dragged.dataset.indx = indx;
						before = false;
						return;
					}
					this.createDrop(el, indx, before);
				}, this);

				break;
			case 'dragend':
				this.dragged = null;
				this.destroyDrops();
				break;
			case 'dragenter':
				ev.target.classList.add('drop-' + ev.target.dataset.drop);
				break;
			case 'dragover':
				ev.preventDefault();
				ev.dataTransfer.dropEffect = "move";
				break;
			case 'dragleave':
				ev.target.classList.remove('drop-' + ev.target.dataset.drop);
				break;
			case 'drop':
				const args = [this.dragged.dataset.indx, ev.target.dataset.indx];
				ev.preventDefault();
				ev.target.classList.remove('drop-' + ev.target.dataset.drop);
				if (args[0] !== args[1] && this.options.onChange) {
					this.options.onChange.apply(this, args);
				}
				break;
		}
	},
	createDrop(targetEl, indx, before) {
		var rect = targetEl.getBoundingClientRect();
		var above = document.createElement('div');
		var halfHeight = rect.height / 2;
		var halfWidth = rect.width / 2;
		above.classList.add('drop-container');
		above.style.top = (rect.top + window.pageYOffset) + 'px';
		above.style.left = (rect.left + window.pageXOffset) + 'px';
		if (this.options.type === 'vertical') {
			above.style.width = rect.width + 'px';
			above.style.height = halfHeight + 'px';
			above.dataset.drop = 'above';
		} else {
			above.style.width = halfWidth + 'px';
			above.style.height = rect.height + 'px';
			above.dataset.drop = 'before';
		}
		above.dataset.indx = indx - (before ? 0 : 1);
		above.addEventListener('dragenter', this, false);
		above.addEventListener('dragover', this, false);
		above.addEventListener('dragleave', this, false);
		above.addEventListener('drop', this, false);
		this.dropItems.push(above);
		this.body.appendChild(above);

		var bellow = document.createElement('div');
		bellow.classList.add('drop-container');

		if (this.options.type === 'vertical') {
			bellow.style.top = (rect.top + halfHeight + window.pageYOffset) + 'px';
			bellow.style.left = (rect.left + window.pageXOffset) + 'px';
			bellow.style.width = rect.width + 'px';
			bellow.style.height = halfHeight + 'px';
			bellow.dataset.drop = 'bellow';
		} else {
			bellow.style.top = (rect.top + window.pageYOffset) + 'px';
			bellow.style.left = (rect.left + halfWidth + window.pageXOffset) + 'px';
			bellow.style.width = halfWidth + 'px';
			bellow.style.height = rect.height + 'px';
			bellow.dataset.drop = 'after';
		}
		bellow.dataset.indx = indx + (before ? 1 : 0);
		bellow.addEventListener('dragenter', this, false);
		bellow.addEventListener('dragover', this, false);
		bellow.addEventListener('dragleave', this, false);
		bellow.addEventListener('drop', this, false);
		this.dropItems.push(bellow);
		this.body.appendChild(bellow);
	},
	destroyDrops() {
		Array.prototype.forEach.call(this.dropItems, function (el) {
			if (!el) {
				return;
			}
			el.removeEventListener('dragenter', this, false);
			el.removeEventListener('dragover', this, false);
			el.removeEventListener('dragleave', this, false);
			el.removeEventListener('drop', this, false);
			this.body.removeChild(el);
		}, this);
		this.dropItems = [];
	},
	destroy() {
		this.destroyDrops();
		if (this.el) {
			this.el.removeEventListener('dragstart', this, false);
			this.el.removeEventListener('dragend', this, false);
		}
		this.el = null;
		this.body = null;
		this.dropItems = [];
		delete this;
	}
};

export default Sortable;