<template>
	<div>
		<c-pick
			:show-toolbar="true"
			:slots="slots"
			v-model="show"
			:values.sync="values"
			value-key="region_name"
			@colChange="onChange"
			@ok="handleConfirm"
			@cancel="handleCancel"/>
	</div>
</template>
<script>
import Picker from '../m-picker.vue';
import area from './dd';
import CreatePortal from '../../create-portal/index';

const config = {
	name: "vcm-picker",
	components: {
		'CPick': Picker
	},
	data() {
		return {
			show: false,
			values: [],
			slots: [{
				values: [],
				// textAlign: 'left',
				className: 'try'
			}, {
				values: [],
			}, {
				values: [],
				// textAlign: 'right'
			}]
		};
	},
	mounted() {
		this.show = true;
		this.slots[0].values = area;
		this.slots[1].values = area[0].child;
		this.slots[2].values = area[0].child[0].child;
	},
	methods: {
		handleCancel(values) {
			this.$emit('close', values);
		},
		handleConfirm(values) {
			this.$emit('sure', values);
		},
		onChange(picker, values, index) {
			if (!this.slots[index * 1 + 1]) return;
			this.slots[index * 1 + 1].values = [...values.child];
			if (index == 0) {
				this.slots[index * 1 + 2].values = [...values.child[0].child];
			}
		},
	},
};
export default config;
export const pickerArea = CreatePortal({}, config);

</script>
