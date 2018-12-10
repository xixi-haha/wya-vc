<template>
	<vc-popup v-model="show" position="bottom" @change="handleChange">
		tip
	</vc-popup>
</template>

<script>
import Popup from '../../m-popup.vue';
import CreatePortal from '../../../create-portal/index';

const config = {
	name: 'vc-xxx',
	components: {
		'vc-popup': Popup
	},
	props: {
		param: Object
	},
	data() {
		return {
			show: false
		};
	},
	computed: {

	},
	watch: {

	},
	created() {
		console.log(this.param);
	},
	mounted() {
		this.show = true;
	},
	methods: {
		handleOk() {
			this.$emit('sure');
		},
		handleCancel() {
			this.$emit('close');
		},
		handleChange() {
			console.log(22);
		}
	},
};

export default config;

export const Tip = CreatePortal({}, config);

</script>

<style lang="scss" scoped>
</style>
