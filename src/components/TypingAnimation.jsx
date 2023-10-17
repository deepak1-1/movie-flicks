import { useState, useEffect } from 'react'
import { styled } from 'styled-components'

const TypingAnimation = ({ text, className, speed = 300 }) => {
   const [typedText, setTypedText] = useState('')

   useEffect(() => {
      let currentIndex = 0
      const typingInterval = setInterval(() => {
         if (currentIndex <= text.length) {
            setTypedText(text.slice(0, currentIndex))
            currentIndex++
         } else {
            setTypedText(text?.[0] || '')
            currentIndex = 1
         }
      }, speed)

      return () => {
         clearInterval(typingInterval)
      }
   }, [text, speed])

   return (
      <AnimatedDiv>
         <span className={className}>{typedText}</span>
      </AnimatedDiv>
   )
}

export default TypingAnimation

const AnimatedDiv = styled.div`
   font-size: 24px;
   font-family: monospace;
   width: 100%;
`
