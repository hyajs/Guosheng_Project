<script setup lang="ts">
const emit = defineEmits('funcAdd')
const props = defineProps(['list'])

interface CheckItems {
	key: number
	CheckAmount: Number
	CheckName: String
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
				<el-col :span="4">
					<el-form-item
						:label="'检查项目' + index"
						:prop="'CheckItems.' + index + '.CheckAmount'"
						:rules="{
							required: true,
							message: `检验数量${index}不得为空！`,
							trigger: 'blur',
						}"
					>
						<el-input v-model="item.CheckAmount" clearable />
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item
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
				<el-col :span="4">
					<el-form-item
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
				<el-col :span="4">
					<el-form-item
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
								><el-button>删除</el-button>
							</el-tooltip>
						</div>
					</template>
				</el-popconfirm>
			</el-row>
		</template>
	</div>
</template>
