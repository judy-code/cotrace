const API_BASE = '/api'

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    // 後端沒回傳 JSON（例如打不到 API、拿到 HTML 錯誤頁），走下面的通用錯誤訊息
  }
  if (!res.ok) {
    throw new Error(data?.message || '發生錯誤，請稍後再試')
  }
  return data
}

export const registerAccount = (payload) => request('/auth/register', { method: 'POST', body: payload })
export const loginAccount = (payload) => request('/auth/login', { method: 'POST', body: payload })
export const logoutAccount = () => request('/auth/logout', { method: 'POST' })
export const fetchCurrentUser = () => request('/auth/me')
