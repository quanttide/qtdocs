import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

function App() {
  const [apps, setApps] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('apps.json')
      .then((r) => r.json())
      .then((data) => setApps(data.apps || []))
      .catch((e) => setError(String(e)))
  }, [])

  return (
    <div className="container">
      <header>
        <h1>量潮文档中心</h1>
        <p className="subtitle">第二大脑文档统一入口</p>
      </header>
      {error && <div className="error">加载应用列表失败：{error}</div>}
      <main>
        <h2>文档应用</h2>
        {apps.length === 0 ? (
          <p className="empty">暂无已上线文档（建设中）</p>
        ) : (
          <ul className="app-list">
            {apps.map((app) => (
              <li key={app.slug}>
                <a href={`/${app.slug}/`}>
                  <span className="name">{app.name}</span>
                  <span className="desc">{app.description}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>
      <footer>QuantTide 文档中心</footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)