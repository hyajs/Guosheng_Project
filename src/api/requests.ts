import { useRequest } from 'vue-request'

export const getDepartments = () => {
	const { data, loading, error } = useRequest(() => http.get('/Department'))
	return { data, loading, error }
}
export const testRequest = () => {
	const { data, loading, error } = useRequest(() => http.post('/mock/post'))
	return { data, loading, error }
}
