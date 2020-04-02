
import Sortable from '../lib/sortable.js';

let obj;

export default {
	bind(el, binding) {
		obj = new Sortable(el, {
			onChange: binding.value.onChange,
			childs: binding.value.childs,
			type: binding.value.type || 'vertical',
			handle: binding.value.handle || false
		});
	},
	inserted(el, binding) {
	},
	unbind(el, binding) {
		if (obj) {
			obj.destroy();
		}
	}
};