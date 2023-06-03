<script lang="ts" setup>
defineOptions({
	name: 'CreateForm',
})
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
	InspectionCheckType: '', //检验单类型
	InspectionType: '', //送检类型
	InspectionObject: '', //检验物品
	ConsignUnit: '', //委托单位
	Requester: '', //送样人
	FinishDate: '', //要求完成时间
	ProductionSequence: '', //产品批次卡
	SampleImageNo: '', //样品图号
	SampleName: '', //样品名称
	ProductSpec: '', //产品规格
	ProductTexture: '', //产品材质
	SurfaceTreatment: '', //表面处理
	Supplier: '', //供应商

	//检验项目
	CheckItems: [
		{
			key: Date.now(),
			CheckAmount: 0, //检验数量
			CheckFatherName: '', //检验大项
			CheckChildName: '', //检验子项
			TechSpec: '', //技术要求
			MeasureStandard: '', //检测方法标准
		},
	],
})

interface CheckItems {
	key: number
	CheckAmount: Number
	CheckName: String
	TechSpec: String
	MeasureStandard: String
}

const rules = reactive<FormRules>({
	InspectionCheckType: [
		{
			required: true,
			message: '请输入所有选项！',
			trigger: 'change',
		},
	],
	InspectionType: [
		{
			required: true,
			message: '请输入所有选项！',
			trigger: 'change',
		},
	],
	InspectionObject: [
		{
			required: true,
			message: '请输入所有选项！',
			trigger: 'change',
		},
	],
	ConsignUnit: [
		{
			required: true,
			message: '请输入所有选项！',
			trigger: 'change',
		},
	],
	Requester: [
		{
			required: true,
			message: '请输入所有选项！',
			trigger: 'change',
		},
	],
	ProductionSequence: [
		{
			required: true,
			message: '请输入所有选项！',
			trigger: 'change',
		},
	],
	SampleImageNo: [
		{
			required: true,
			message: '请输入所有选项！',
			trigger: 'change',
		},
	],
	SampleName: [
		{
			required: true,
			message: '请输入所有选项！',
			trigger: 'change',
		},
	],
	ProductTexture: [
		{
			required: true,
			message: '请输入所有选项！',
			trigger: 'change',
		},
	],
	SurfaceTreatment: [
		{
			required: true,
			message: '请输入所有选项！',
			trigger: 'change',
		},
	],
	Supplier: [
		{
			required: true,
			message: '请输入所有选项！',
			trigger: 'change',
		},
	],
})

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			console.log('submit!')
		} else {
			console.log('error submit!', fields)
		}
	})
}

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
}

const addCheckItems = () => {
	ruleForm.CheckItems.push({
		key: Date.now(),
		CheckAmount: 0, //检验数量
		CheckName: '', //检验项目
		TechSpec: '', //技术要求
		MeasureStandard: '', //检测方法标准
	})
}
const removeCheckItems = (item: CheckItems) => {
	const index = ruleForm.CheckItems.indexOf(item)
	if (index !== -1) {
		ruleForm.CheckItems.splice(index, 1)
	}
}
</script>

<template>
	<el-form
		ref="ruleFormRef"
		:model="ruleForm"
		:rules="rules"
		label-position="left"
		require-asterisk-position="right"
		status-icon
	>
		<el-form-item label="委托检验单类型" prop="InspectionCheckType">
			<el-col :span="8">
				<el-select
					v-model="ruleForm.InspectionCheckType"
					placeholder="委托检验单类型"
					clearable
				>
					<el-option label="质检员送检委托单" value="质检员送检委托单" />
					<el-option label="车间送检委托单" value="车间送检委托单" />
				</el-select>
			</el-col>
		</el-form-item>
		<el-form-item label="送检类型" prop="InspectionType">
			<el-col :span="8">
				<el-select
					v-model="ruleForm.InspectionType"
					placeholder="请选择送检类型"
					clearable
				>
					<el-option label="首件检验" value="首件检验" />
					<el-option label="过程检验" value="过程检验" />
				</el-select>
			</el-col>
		</el-form-item>
		<el-form-item label="检验物品" prop="InspectionObject">
			<el-col :span="8">
				<el-select
					v-model="ruleForm.InspectionObject"
					placeholder="请选择检验物品"
					clearable
				>
					<el-option label="产品样品" value="产品样品" />
					<el-option label="材料样品" value="材料样品" />
				</el-select>
			</el-col>
		</el-form-item>

		<el-form-item label="委托单位" prop="ConsignUnit">
			<el-col :span="8">
				<el-input
					v-model="ruleForm.ConsignUnit"
					clearable
					placeholder="冷墩车间"
				></el-input>
			</el-col>
		</el-form-item>

		<el-form-item label="送样人" prop="Requester">
			<el-col :span="8">
				<el-input
					v-model="ruleForm.Requester"
					clearable
					placeholder="熊大/熊二"
				></el-input>
			</el-col>
		</el-form-item>

		<el-form-item label="要求完成日期">
			<el-col :span="8">
				<el-date-picker
					v-model="ruleForm.FinishDate"
					type="datetime"
					placeholder="请选择日期"
					format="YYYY/MM/DD hh:mm:ss"
					value-format="YYYY-MM-DD h:m:s a"
				/>
			</el-col>
		</el-form-item>

		<el-form-item label="产品批次卡（分卡编号）" prop="ProductionSequence">
			<el-col :span="8">
				<el-input
					v-model="ruleForm.ProductionSequence"
					clearable
					placeholder="CP-xxxxx"
				>
					<template #prepend>CP-</template>
				</el-input>
			</el-col>
		</el-form-item>

		<el-form-item label="样品图号" prop="SampleImageNo">
			<el-col :span="8">
				<el-input v-model="ruleForm.SampleImageNo" clearable> </el-input>
			</el-col>
		</el-form-item>

		<el-form-item label="样品名称" prop="SampleName">
			<el-col :span="8">
				<el-input v-model="ruleForm.SampleName" clearable> </el-input>
			</el-col>
		</el-form-item>

		<el-form-item label="产品规格">
			<el-col :span="8">
				<el-input v-model="ruleForm.ProductSpec" clearable> </el-input>
			</el-col>
		</el-form-item>

		<el-form-item label="产品材质" prop="ProductTexture">
			<el-col :span="8">
				<el-select
					v-model="ruleForm.ProductTexture"
					placeholder="请选择产品材质"
					clearable
				>
					<!-- 后台请求 -->
				</el-select>
			</el-col>
		</el-form-item>

		<el-form-item label="表面处理" prop="SurfaceTreatment">
			<el-col :span="8">
				<el-select
					v-model="ruleForm.SurfaceTreatment"
					placeholder="请选择表面处理类型"
					clearable
				>
					<!-- 后台请求 -->
				</el-select>
			</el-col>
		</el-form-item>

		<el-form-item label="供应商" prop="Supplier">
			<el-col :span="8">
				<el-input v-model="ruleForm.Supplier" clearable> </el-input>
			</el-col>
		</el-form-item>

		<!-- 自定义生成多个检查项目 -->
		<template v-for="(item, index) in ruleForm.CheckItems" :key="item.key">
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
					@confirm="removeCheckItems(item)"
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
		<el-form-item>
			<el-button type="primary" @click="submitForm(ruleFormRef)"
				>提交</el-button
			>
			<el-button @click="addCheckItems">创建新的检查项目</el-button>
			<el-button @click="resetForm(ruleFormRef)">重制</el-button>
		</el-form-item>
	</el-form>
</template>
<style scoped></style>
