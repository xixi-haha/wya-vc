<template>
	<div class="vcm-popup">
		<div v-show="mask && isActive && position !== 'top'" class="__mask" @click="handleClose(maskClosable)" />
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
	name: "vcm-popup",
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
		show(v) {
			this.isActive = v;
		}
	},
	methods: {
		handleTranstionLeave() {
			this.isActive = false;
			this.handleClose();

		},
		handleClose(maskClosable = true) {
			if (maskClosable) {
				this.$emit('close');
			}
		},
	},
};

</script>
<style lang="scss" scoped>
	.vcm-popup {
		position: fixed;
		width: 100%;
		background-color: #fff;
		transition: .2s ease-out;

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
	}

</style>
