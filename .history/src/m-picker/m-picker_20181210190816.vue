<template>
	<div class="vcm-picker">
		<c-popup v-model="show" @change="handleChange">
			<div class="__header">
				<div class="__item __left" @click="handleCancel">{{ cancelText }}</div>
				<div class="__item __title">{{ title }}</div>
				<div class="__item __right" @click="handleOk">{{ confirmText }}</div>
			</div>
			<div class="__main">
				<c-col
					v-for="(item,index) in slots"
					:ref="`colVal${index}`"
					:key="index"
					:index="index"
					:divider="item.divider"
					:values="item.values"
					:content="item.content"
					:flex="item.flex"
					:text-align="item.textAlign"
					:class-name="item.className"
					:value-key="valueKey"
					@change="handleColChange" />
			</div>

		</c-popup>
	</div>
</template>

<script>
import CPopup from '../m-popup/m-popup.vue';
import CCol from './component/picker-col';

export default {
	components: {
		CPopup,
		CCol
	},
	props: {
		// slots
		/*
			{
				divider:'对应slot是否为分隔符',
				values:'对应 slot 的备选值数组。若为对象数组，则需在 mt-picker 标签上设置 value-key 属性来指定显示的字段名',
				content'分隔符内容',
				textAlign:'对齐方式(默认居中对齐)',
				className:'对应的类名'
			}
		*/
		slots: {
			type: Array
		},
		showToolbar: {
			type: Boolean
		},
		valueKey: {
			type: String
		},
		value: {
			type: Array,
		},
		cancelText: {
			type: String,
			default: '取消'
		},
		confirmText: {
			type: String,
			default: '确定'
		}
	},
	data() {
		return {
			show: true,
			values: []
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.slots.forEach(item => {
				this.values.push(item.values ? item.values[0] : '');
			});
			this.emitInput();
		});
	},
	methods: {
		handleOk() {},
		handleCancel() {},
		handleColChange(v, index) {
			this.$emit('change', this, v, index);
			this.setValues(v, index);
			this.slots.forEach((item, slotIndex) => {
				if (!item.divider && slotIndex > index) {
					this.$refs[`colVal${slotIndex}`][0].translateY = 0;
					this.setValues(item.values[0], slotIndex);
				}
			});
		},
		setValues(val, index) {
			this.values[index] = val;
			this.emitInput();
		},
		getValues() {
			let endValues = this.values.filter((item, index) => {
				return !this.slots[index].divider;
			});
			return endValues;
		},
		emitInput() {
			this.$emit('input', this.getValues());
		},
		handlePickerClose(v) {
			this.$emit('picker-close', this.values, v);
		}
	},
	destoryed() {}
};

</script>

<style scoped lang='scss'>
	.vcm-picker {
		.__header {
			position: relative;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #ddd;
			background-image: linear-gradient(180deg, #e7e7e7, #e7e7e7, transparent, transparent);
			background-position: bottom;
			background-size: 100% 1px;
			background-repeat: no-repeat;

		}

		.__title {
			flex: 1;
			text-align: center;
			color: #000;
		}

		.__item {
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			padding: 9px 15px;
			height: 42px;
			color: #108ee9;
			font-size: 17px;
		}
		.__main{
			display: flex;
			align-items: center;
			flex-direction: row;
			align-items: center;
			flex: 1;
			box-sizing: border-box;
			overflow: hidden;
		}
	}

</style>
