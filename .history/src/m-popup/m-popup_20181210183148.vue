<template>
	<div class="vcm-popup">
		<div v-show="mask&&isActive&&position!='top'" class="__mask" @click="handleClose" />
		<div class="__wrap">
			<transition :name="currentTransition" @after-leave="handleTranstionLeave">
				<div v-if="isActive" :class="positionClass" class="vcm-popup">
					<div class="__content">
						<div :class="position == 'top'?'darkbg':''" class="__main">
							<slot />
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
			return `__animate__${this.position}`;
		},
		positionClass() {
			return `__${this.position}`;
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
	mounted() {},
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
	},
};

</script>
<style lang="scss" scoped>
	.__animate__top-enter,
	.__animate__top-leave-active {
		transform: translate(0, -100%);
	}

	.__animate__bottom-enter,
	.__animate__bottom-leave-active {
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

		.__main {
			display: flex;
			align-items: center;
			flex-direction: row;
			align-items: center;
			flex: 1;
			box-sizing: border-box;
			overflow: hidden;
		}

		.__content {
			min-height: 50px;
		}

		.__bottom {
			right: 0;
			bottom: 0;
			left: 0;
			padding-bottom: env(safe-area-inset-bottom);
		}

		.__top {
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

		.__wrap {
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
	}

</style>
