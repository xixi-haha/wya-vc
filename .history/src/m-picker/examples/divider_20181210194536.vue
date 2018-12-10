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
import CPick from '../m-picker.vue';
import area from './dd';
import CreatePortal from '../../create-portal/index';

const config = {
	name: "vcm-picker",
	components: {
		CPick
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
				divider: true
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
		handleByCompent() {
			this.show = true;
		},
		handleCancel(values) {
			console.log(`当前picker已关闭通过点击取消按钮，返回值为${JSON.stringify(values)}`);
		},
		handleConfirm(values) {
			console.log(`当前picker已关闭通过点击确定按钮，返回值为`);
			console.log(values);
		},
		onChange(picker, values, index) {
			if (!this.slots[index * 1 + 1]) return;
			this.slots[index * 1 + 1].values = [...values.child];
			if (index == 0) {
				this.slots[index * 1 + 2].values = [...values.child[0].child];
			}
		},
		handleByOther() {}
	},
};
export default config;
export const pickerArea = CreatePortal({}, config);

</script>
