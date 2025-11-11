const BASE = 'https://jsonplaceholder.typicode.com'

export async function fetchUsers() {
  const res = await fetch(`${BASE}/users`)
  if (!res.ok) throw new Error('Erro ao buscar usuários')
  return res.json()
}

export async function fetchUser(id) {
  const res = await fetch(`${BASE}/users/${id}`)
  if (!res.ok) throw new Error('Erro ao buscar usuário')
  return res.json()
}

export async function fetchPostsByUser(id) {
  const res = await fetch(`${BASE}/users/${id}/posts`)
  if (!res.ok) throw new Error('Erro ao buscar posts')
  return res.json()
}

export async function fetchAllPosts() {
  const res = await fetch(`${BASE}/posts`)
  if (!res.ok) throw new Error('Erro ao buscar posts')
  return res.json()
}
