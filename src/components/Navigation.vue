<script setup lang="ts">
import { SwitchIcon } from 'vue-dark-switch'

const menus = [
	{
		title: '表单填写',
		key: 'nav',
		routes: '/createForm',
		disabled: false,
	},
	{
		title: '数据分析',
		key: 'dataAnalysis',
		routes: '/',
		disabled: true,
	},
]
</script>

<template>
	<nav class="flex flex-col">
		<div class="mb-2 flex justify-center">
			<img src="/logo.JPG" class="h-20 w-20 object-fill" alt="Guosheng logo" />
		</div>

		<div class="mb-2 flex justify-center">
			<SwitchIcon unmount-persets />
		</div>
		<el-menu mode="vertical" default-active="" router>
			<el-menu-item
				v-for="submenus in menus"
				:key="submenus.key"
				:disabled="submenus.disabled"
				:index="submenus.routes"
			>
				<template #title>{{ submenus.title }}</template>
			</el-menu-item>
		</el-menu>
	</nav>
</template>
