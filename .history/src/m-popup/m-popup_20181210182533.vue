<template>
	<div class="vcm-popup">
		<div v-show="modal&&show&&position!='top'" class="__mask" @click="handleMaskClick" />
		<div class="vcm-popup-wrap">
			<transition :name="currentTransition" @after-leave="handleTranstionLeave">
				<div v-if="show" :class="positionClass" class="vcm-popup">
					<div class="vcm-popup-content">
						<div :class="position == 'top'?'darkbg':''" class="vcm-popup-content-main">
							<slot/>
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
	model: {
		prop: 'show',
		event: 'change'
	},
	props: {
		show: {
			type: Boolean,
			default: false
		},
		position: {
			type: String,
			default: 'bottom'
		},
		mask: {
			type: Boolean,
			default: true
		},
		maskClosable: {
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
			isActive: this.show
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
	},
	methods: {
		handleTranstionLeave() {
			this.isActive = false;
			this.handleClose();

		},
		handleClose(mask = true) {
			if (this.maskClosable) {
				this.$emit('close');
			}
		},
		handleMaskClick() {
			if (this.closeOnClickModa) return;
			this.handleHide();
		},
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

		.__mask {
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
