import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ChallengesContext } from './ChallengesContext'

interface CountdownContextData {
   minutes: number
   seconds: number
   hasFinished: boolean
   isActive: boolean
   startCountdown: () => void
   resetCountdown: () => void
}

interface CountdownProviderProps {
   //tipagem do children como ReactNode, porque lá no _app.tsx o <Component {...pageProps} /> é um componente React
   children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout // node.js.timeout -> tipo da variável

export function CountdownProvider({ children }: CountdownProviderProps) {
   const { startNewChallenge } = useContext(ChallengesContext)

   const [time, setTime] = useState(1 * 60) /* 25 minutos em segundos */
   const [isActive, setIsActive] = useState(false)
   const [hasFinished, setHasFinished] = useState(false);

   const minutes = Math.floor(time / 60)
   const seconds = time % 60

   function startCountdown() {
      setIsActive(true)
   }

   function resetCountdown() {
      // Evita a execução do timeout após um segundo. Ao setar isActive para false, o setTimeout já foi executado e irá diminuir ainda 1 segundo. 
      // Aqui esse comportamento é cancelado
      clearTimeout(countdownTimeout)
      setIsActive(false);
      setTime(0.05 * 60)
      setHasFinished(false)
   }

   useEffect(() => {
      if (isActive && time > 0) {
         countdownTimeout = setTimeout(() => { /* setTimeout():  fazer com que algo acontece depois de um tempo (1000 milessegundos, 1 segundo) */
            setTime(time - 1)
         }, 1000)
      } else if (isActive && time === 0) {
         setHasFinished(true)
         setIsActive(false)
         startNewChallenge()
      }
   }, [isActive, time])
   
   return (
      <CountdownContext.Provider 
         value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
         }}
      >
         {children}
      </CountdownContext.Provider>
   )
}