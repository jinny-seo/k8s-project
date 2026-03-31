import { useState, useEffect } from 'react'
import Landing from './pages/Landing.jsx'
import V1 from './pages/V1.jsx'
import V2SavingsWaterfall from './pages/V2SavingsWaterfall.jsx'
import V3HealthFirst from './pages/V3HealthFirst.jsx'
import V4BeforeAfter from './pages/V4BeforeAfter.jsx'
import V5Opportunity from './pages/V5Opportunity.jsx'
import V6Allocation from './pages/V6Allocation.jsx'

const ROUTES = {
  v1: V1,
  v2: V2SavingsWaterfall,
  v3: V3HealthFirst,
  v4: V4BeforeAfter,
  v5: V5Opportunity,
  v6: V6Allocation,
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
