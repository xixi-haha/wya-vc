<template>
	<div>
		<c-pick
			:show-toolbar="true"
			:slots="slots"
			v-model="show"
			:values.sync="values"
			value-key="region_name"
			@colChange="onChange"
			@picker-close="handleClose"/>
		<button @click="handleByCompent">组件形式调用选择器</button>
	</div>
</template>
<script>
import CPick from '../m-picker.vue';
import area from './dd';

export default {
	name: "vc-pop-up-basic",
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
	computed: {

	},
	mounted() {
		this.slots[0].values = area;
		this.slots[1].values = area[0].child;
		this.slots[2].values = area[0].child[0].child;
	},
	methods: {
		handleByCompent() {
			this.show = true;
		},
		handleClose(values, status) {
			console.log(`当前picker已关闭（${status}），返回值为${values}`);
		},
		onChange(picker, values, index) {
			if (!this.slots[index * 1 + 1]) return;
			this.slots[index * 1 + 1].values = [...values.child];
			if (index == 0) {
				this.slots[index * 1 + 2].values = [...values.child[0].child];
			}
		}
	},
};

</script>
