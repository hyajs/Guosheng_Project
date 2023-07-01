<template>
	<div class="flex">
		<Sidebar class="mt-5" />
		<div class="mt-5 w-screen flex flex-col justify-center">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</div>
	<footer class="absolute bottom-5 mx-auto text-center container">
		Guosheng Project
	</footer>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
