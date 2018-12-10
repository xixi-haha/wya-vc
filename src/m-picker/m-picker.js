import Vue from 'vue';
// import MPopup from './m-popup.vue';
import { VcInstance } from '../vc/index';

const Dom = document.body;
const cName = "MPopup";

export default (html, opts = {}) => {
	// VcInstance.APIS[cName] && VcInstance.APIS[cName].$emit('popup-close');
	// const div = document.createElement('div');
	// let vm;
	// const VueComponent = Vue.extend(MPopup);
	// vm = new VueComponent({
	// 	el: div,
	// 	propsData: {
	// 		...opts,
	// 		html
	// 	}
	// });
	// vm.show = true;
	// vm.$on('popup-close', () => {
	// 	setTimeout(() => {
	// 		vm.$destroy();
	// 		Dom.removeChild(vm.$el);
	// 		delete VcInstance.APIS[cName];
	// 	}, 300);
	// });
	// VcInstance.APIS[cName] = vm;
	// document.body.appendChild(vm.$el);
	return 'vm';
};
