import { useState } from 'react'

import './styles.scss'

const SwitchTabs = ({ data = [], onTabChange }) => {
   const [selectedTab, setSelectedTab] = useState(0)
   const [left, setLeft] = useState(0)

   const setActiveTab = (tab, index) => {
      setLeft(index * 100)
      setTimeout(() => {
         setSelectedTab(index)
      }, 300)
      onTabChange(tab)
   }

   return (
      <div className="switchingTabs">
         <div className="tabItems">
            {data.map((tab, index) => (
               <span
                  key={tab}
                  className={`tabItem ${index === selectedTab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab, index)}
               >
                  {tab}
               </span>
            ))}
            <span style={{ left }} className="movingBg"></span>
         </div>
      </div>
   )
}
export default SwitchTabs
