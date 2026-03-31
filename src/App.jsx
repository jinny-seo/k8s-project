import { useState, useEffect } from 'react'
import Landing from './pages/Landing.jsx'
import V1 from './pages/V1.jsx'
import V2DarkMode from './pages/V2DarkMode.jsx'
import V3Compact from './pages/V3Compact.jsx'
import V4KpiCards from './pages/V4KpiCards.jsx'
import V5Gauges from './pages/V5Gauges.jsx'
import V6Executive from './pages/V6Executive.jsx'

const ROUTES = {
  v1: V1,
  v2: V2DarkMode,
  v3: V3Compact,
  v4: V4KpiCards,
  v5: V5Gauges,
  v6: V6Executive,
}

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1))

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.slice(1))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const Page = ROUTES[route] || Landing
  return <Page />
}
