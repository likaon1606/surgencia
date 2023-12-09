import { useState } from 'react'
import ReportForm from './componentsReport/ReportForm'
import ReportMap from './componentsReport/ReportMap'

const ReportConflict = () => {
  const [location, setLocation] = useState(null)

  return (
    <div className="d-flex" style={{ maxHeight: '100vh' }}>
      <ReportForm location={location} />
      <ReportMap setLocation={setLocation} />
    </div>
  )
}

export default ReportConflict
