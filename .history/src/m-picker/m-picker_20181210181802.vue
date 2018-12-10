<template>
	<div>
		<c-popup
			v-model="show"
			:show-header="showToolbar"
			:loading="true"
			@popup-close="handlePickerClose">
			<div v-show="showHeader&&position!='top'" class="vcm-popup-header">
				<div v-show="showCancel" class="vcm-popup-item vcm-popup-header-left" @click="handleHide">取消</div>
				<div class="vcm-popup-item vcm-popup-header-title">{{ title }}</div>
				<div v-show="showConfirm" class="vcm-popup-item vcm-popup-header-right" @click="handleHide">确定</div>
			</div>
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
</style>
