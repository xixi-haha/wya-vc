<template>
	<vc-files-picker 
		:upload="{multiple: true}"
		class="v-files-picker "
	>
		<!-- <template slot-scope="slotProps">
			<div v-for="(item, index) in slotProps.files" :key="index">
				{{ item }}
			</div>
		</template> -->
		<div slot="trigger" class="_upload">
			上传
		</div>
	</vc-files-picker>
</template>
<script>
import FilesPicker from '../files-picker';
import { VcInstance } from '../../vc/index';

VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa',
		URL_UPLOAD_FILE_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadfile&encode=utf-8&code=oa'
	}
});

export default {
	name: "vc-files-picker-basic",
	components: {
		"vc-files-picker": FilesPicker
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>

<style lang="scss">
.v-files-picker {
	._upload {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 88px;
		height: 40px;
		font-size: 14px;
		border: 1px solid #d4d4d4;
		border-radius: 6px;
		background: #ffffff;
		margin-bottom: 12px;
		cursor: pointer;
		&:hover {
			border: 1px solid #0085ff;
			color: #0085ff;
		}
	}
}
</style>

