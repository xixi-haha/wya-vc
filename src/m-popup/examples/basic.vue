<template>
	<div>
		<button @click="handleShow">click</button>
	</div>
</template>
<script>
import mPopupAction from '../index';

export default {
	name: "vc-pop-up-basic",
	components: {
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
			// this.show = true;
			mPopupAction('xxxxx', {
				position: 'top'
			});
		}
	}
};

</script>
