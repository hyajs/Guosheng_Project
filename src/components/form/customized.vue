<script setup lang="ts">
const emit = defineEmits('funcAdd')
const props = defineProps(['list'])

interface CheckItems {
	key: number
	CheckAmount: Number
	CheckChildName: String
	CheckFatherName: String
	TechSpec: String
	MeasureStandard: String
}

const handleDeleteClick = (item: CheckItems) => {
	emit('removeCheckItems', item)
}
</script>
<template>
	<div>
		<template v-for="(item, index) in props.list" :key="item.key">
			<el-row>
				<el-col :span="6">
					<el-form-item
						label-width="200px"
						class="sublabel"
						:label="'检查项目' + index"
						:prop="'CheckItems.' + index + '.CheckAmount'"
						:rules="{
							required: true,
							message: `检验数量${index}不得为空！`,
							trigger: 'blur',
						}"
					>
						<el-input
							v-model="item.CheckAmount"
							clearable
							placeholder="检验数量"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="4" :offset="1">
					<el-form-item
						label-width="0px"
						:prop="'CheckItems.' + index + '.CheckFatherName'"
						:rules="{
							required: true,
							message: `检查大项${index}不得为空！`,
							trigger: 'blur',
						}"
					>
						<el-select
							v-model="item.CheckFatherName"
							placeholder="请选择大检验项目"
							clearable
						>
							<!-- 后台请求 -->
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="4">
					<el-form-item
						label-width="0px"
						:prop="'CheckItems.' + index + '.CheckChildName'"
						:rules="{
							required: true,
							message: `检查子项${index}不得为空！`,
							trigger: 'blur',
						}"
					>
						<el-select
							v-model="item.CheckChildName"
							placeholder="请选择子检验项目"
							clearable
						>
							<!-- 后台请求 -->
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item
						label-width="0px"
						:prop="'CheckItems.' + index + '.TechSpec'"
						:rules="{
							required: true,
							message: `技术要求${index}不得为空！`,
							trigger: 'blur',
						}"
					>
						<el-input
							v-model="item.TechSpec"
							clearable
							placeholder="技术要求"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="3" :offset="1">
					<el-form-item
						label-width="0px"
						:prop="'CheckItems.' + index + '.MeasureStandard'"
						:rules="{
							required: true,
							message: `检测方法${index}不得为空！`,
							trigger: 'blur',
						}"
					>
						<el-input
							v-model="item.MeasureStandard"
							clearable
							placeholder="检测方法标准"
						/>
					</el-form-item>
				</el-col>
				<el-popconfirm
					title="确认要删除该条记录嘛?"
					@confirm="handleDeleteClick(item)"
				>
					<template #reference>
						<div>
							<el-tooltip
								effect="dark"
								content="删除该条检查项目"
								placement="top"
								><el-button type="danger"
									>删除
									<template #icon>
										<div class="i-material-symbols:delete"></div>
									</template>
								</el-button>
							</el-tooltip>
						</div>
					</template>
				</el-popconfirm>
			</el-row>
		</template>
	</div>
</template>
<style scoped>
.el-form-item__label {
	max-width: 100px;
	margin: 0px;
}
.sublabel .el-form-item__content {
	margin: 0px;
	width: 100px;
}
</style>
