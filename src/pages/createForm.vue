<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { useRequest } from 'vue-request'
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
			CheckAmount: '', //检验数量
			CheckFatherName: '', //检验大项
			CheckChildName: '', //检验子项
			TechSpec: '', //技术要求
			MeasureStandard: '', //检测方法标准
		},
	],
})

// 请求下拉框数据
const useDropDownEffects = () => {
	const departments = ref([])
	const productTextureList = ref([])
	const surfaceProcessList = ref([])

	const getDepartments = () => {
		useRequest(() => http.get('/Department'), {
			onSuccess: (res) => {
				return (departments.value = res.data)
			},
		})
	}
	const getProductTexture = () => {
		useRequest(() => http.get('/Product'), {
			onSuccess: (res) => {
				return (productTextureList.value = res.data)
			},
		})
	}
	const getSurfaceProcess = () => {
		useRequest(() => http.get('/SurfaceProcessInfo'), {
			onSuccess: (res) => {
				return (surfaceProcessList.value = res.data)
			},
		})
	}

	onMounted(() => {
		getDepartments()
		getProductTexture()
		getSurfaceProcess()
	})
	return {
		departments,
		productTextureList,
		surfaceProcessList,
	}
}
const useSubmitEffects = () => {
	const submitForm = async (formEl: FormInstance | undefined) => {
		if (!formEl) return
		await formEl.validate((valid, fields) => {
			if (valid) {
				http.post('/InspectionOrder', formEl).then((res) => {
					console.log(res)
				})
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
	return {
		submitForm,
		resetForm,
	}
}

const { submitForm, resetForm } = useSubmitEffects()
const { departments, productTextureList, surfaceProcessList } =
	useDropDownEffects()

interface CheckItems {
	key: number
	CheckAmount: Number
	CheckChildName: String
	CheckFatherName: String
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

const addCheckItems = () => {
	ruleForm.CheckItems.push({
		key: Date.now(),
		CheckAmount: '', //检验数量
		CheckChildName: '', //检验子项目
		CheckFatherName: '', //检验父项目
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
	<div class="mx-auto container">
		<el-form
			ref="ruleFormRef"
			:model="ruleForm"
			:rules="rules"
			label-position="left"
			require-asterisk-position="right"
			label-width="200px"
			status-icon
		>
			<el-form-item label="委托检验单类型" prop="InspectionCheckType">
				<el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
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
				<el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
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
				<el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
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
				<el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
					<el-select
						v-model="ruleForm.ConsignUnit"
						placeholder="请选择部门"
						clearable
						filterable
					>
						<el-option
							v-for="item in departments"
							:key="item.name"
							:label="item.name"
							:value="item.name"
						/>
					</el-select>
				</el-col>
			</el-form-item>

			<el-form-item label="送样人" prop="Requester">
				<el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
					<el-input
						v-model="ruleForm.Requester"
						clearable
						placeholder="熊大/熊二"
					></el-input>
				</el-col>
			</el-form-item>

			<el-form-item label="要求完成日期">
				<el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
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
				<el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
					<el-input v-model="ruleForm.SampleImageNo" clearable> </el-input>
				</el-col>
			</el-form-item>

			<el-form-item label="样品名称" prop="SampleName">
				<el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
					<el-input v-model="ruleForm.SampleName" clearable> </el-input>
				</el-col>
			</el-form-item>

			<el-form-item label="产品规格">
				<el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
					<el-input v-model="ruleForm.ProductSpec" clearable> </el-input>
				</el-col>
			</el-form-item>

			<el-form-item label="产品材质" prop="ProductTexture">
				<el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
					<el-select
						v-model="ruleForm.ProductTexture"
						placeholder="请选择产品材质"
						clearable
						autocomplete
						filterable
					>
						<el-option
							v-for="item in productTextureList"
							:key="item.name"
							:label="item.name"
							:value="item.name"
						/>
					</el-select>
				</el-col>
			</el-form-item>

			<el-form-item label="表面处理" prop="SurfaceTreatment">
				<el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
					<el-select
						v-model="ruleForm.SurfaceTreatment"
						placeholder="请选择表面处理类型"
						clearable
						filterable
					>
						<el-option
							v-for="item in surfaceProcessList"
							:key="item.name"
							:label="item.name"
							:value="item.name"
						/>

						<!-- 后台请求 -->
					</el-select>
				</el-col>
			</el-form-item>

			<el-form-item label="供应商" prop="Supplier">
				<el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
					<el-input v-model="ruleForm.Supplier" clearable> </el-input>
				</el-col>
			</el-form-item>
			<FormCustomized
				:list="ruleForm.CheckItems"
				@removeCheckItems="removeCheckItems"
			></FormCustomized>

			<el-form-item>
				<el-button type="primary" @click="submitForm(ruleFormRef)"
					>提交</el-button
				>
				<el-button @click="addCheckItems">创建新的检查项目</el-button>
				<el-button @click="resetForm(ruleFormRef)">重制</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<style scoped></style>
