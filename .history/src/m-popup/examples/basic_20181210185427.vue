<template>
	<div>
		<vcm-popup v-model="show">
			xxx
		</vcm-popup>
		<button @click="handleShow">当前组件：click</button>
		<button @click="handleRoot">根视图(top)：click</button>
		<button @click="handleRootBottom">根视图(bottom)：click</button>
	</div>
</template>
<script>
import { Tip } from './tip/tip.vue';
import MPopup from '../m-popup.vue';

export default {
	name: "vc-pop-up-basic",
	components: {
		'vcm-popup': MPopup
	},
	data() {
		return {
			show: false
		};
	},
	computed: {

	},
	methods: {
		handleShow() {
			this.show = true;
		},
		handleRoot() {
			// this.show = true;
			Tip.popup({
				param: {
					id: 2,
					postion: top
				}
			}).then(() => {
				console.log('success');
			}).catch(() => {
				console.log('error');
			});
		},
		handleRootBottom() {
			Tip.popup({
				param: {
					id: 2,
				}
			}).then(() => {
				console.log('success');
			}).catch(() => {
				console.log('error');
			});
		}
	}
};

</script>
