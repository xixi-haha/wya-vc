<template>
	<div class="vcm-popup">
		<div v-show="modal&&show&&position!='top'" class="__mask" @click="handleMaskClick" />
		<div class="vcm-popup-wrap">
			<transition :name="currentTransition">
				<div v-if="show" :class="positionClass" class="vcm-popup">
					<div v-show="showHeader&&position!='top'" class="vcm-popup-header">
						<div v-show="showCancel" class="vcm-popup-item vcm-popup-header-left" @click="handleHide">取消</div>
						<div class="vcm-popup-item vcm-popup-header-title">{{ title }}</div>
						<div v-show="showConfirm" class="vcm-popup-item vcm-popup-header-right" @click="handleHide">确定</div>
					</div>
					<div class="vcm-popup-content">
						<div :class="position == 'top'?'darkbg':''" class="vcm-popup-content-main">
							<template v-if="html">
								<div v-html="html" />
							</template>
							<slot v-else />
						</div>
						<div class="vcm-popup-content-foot">
							<slot name="foot" />
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
export default {
	name: "vc-m-popup",
	props: {
		value: {
			type: Boolean,
			default: false
		},
		position: {
			type: String,
			default: 'bottom'
		},
		showHeader: {
			type: Boolean,
			default: true
		},
		showCancel: {
			type: Boolean,
			default: true
		},
		showConfirm: {
			type: Boolean,
			default: true
		},
		modal: {
			type: Boolean,
			default: true
		},
		closeOnClickModal: {
			type: Boolean,
			default: true
		},
		title: {
			type: String,
			default: ''
		},
		html: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			show: false
		};
	},
	computed: {
		currentTransition() {
			return `vcm-popup-animate__${this.position}`;
		},
		positionClass() {
			return `vcm-popup__${this.position}`;
		}
	},
	watch: {
		value(v) {
			if (v) {
				this.show = v;
			}
		},
		show(v) {
			if (v && this.position == 'top') {
				setTimeout(() => {
					this.show = false;
					this.handleHide();
				}, 3000);
			}
		}
	},
	mounted() {
		if (this.value) {
			this.show = true;
		}
	},
	methods: {
		handleMaskClick() {
			if (this.closeOnClickModa) return;
			this.handleHide();
		},
		handleHide() {
			this.show = false;
			this.$emit('popup-close', this.show);
			this.$emit('input', false);
		}
	},
};

</script>
<style lang="scss" scoped>
	.vcm-popup-animate__top-enter,
	.vcm-popup-animate__top-leave-active {
		transform: translate(0, -100%);
	}

	.vcm-popup-animate__bottom-enter,
	.vcm-popup-animate__bottom-leave-active {
		transform: translate(0, 100%);
	}

	.darkbg {
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.3);
		color: #fff;
		height: 50px;
		font-size: 16px;
	}

	.vcm-popup {
		position: fixed;
		width: 100%;
		background-color: #fff;
		transition: .2s ease-out;

		&__bottom {
			right: 0;
			bottom: 0;
			left: 0;
			padding-bottom: env(safe-area-inset-bottom);
		}

		&__top {
			top: 0;
			right: 0;
			left: 0;
			padding-top: env(safe-area-inset-bottom);

		}

		&-mask {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: rgba(0, 0, 0, .4);
			height: 100%;
		}

		&-wrap {
			position: fixed;
		}

		&-item {
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			padding: 9px 15px;
			height: 42px;
			color: #108ee9;
			font-size: 17px;
		}

		&-header {
			position: relative;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #ddd;
			background-image: linear-gradient(180deg, #e7e7e7, #e7e7e7, transparent, transparent);
			background-position: bottom;
			background-size: 100% 1px;
			background-repeat: no-repeat;

			&-title {
				flex: 1;
				text-align: center;
				color: #000;
			}
		}

		&-content {
			min-height: 50px;

			&-main {
				display: flex;
				align-items: center;
				flex-direction: row;
				align-items: center;
				flex: 1;
				box-sizing: border-box;
				overflow: hidden;
			}
		}
	}

</style>
