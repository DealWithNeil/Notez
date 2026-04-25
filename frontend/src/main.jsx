import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root')

const renderFatal = (reason) => {
  const message =
    reason instanceof Error
      ? reason.stack || reason.message
      : typeof reason === 'string'
        ? reason
        : JSON.stringify(reason, null, 2)

  if (rootElement) {
    rootElement.innerHTML = `<pre style="white-space:pre-wrap;margin:16px;color:#b91c1c;font:13px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${message}</pre>`
  }
}

window.addEventListener('error', (e) => renderFatal(e.error || e.message))
window.addEventListener('unhandledrejection', (e) => renderFatal(e.reason))

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
