import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../challenges.json'

interface challenge {
   type: 'body' | 'eye' //body é uma string, com só possui dois valores, aqui estão definidos ambos
   description: string
   amount: number
}

interface ChallengesContextData {
   level: number
   currentExperience: number 
   challengesCompleted: number
   activeChallenge: challenge //definido ali em cima
   experienceToNextLevel: number
   levelUp: () => void //tipando que é uma função que não tem retorno
   startNewChallenge: () => void
   resetChallenge: () => void
   completeChallenge: () => void
}

interface ChallengesProviderProps {
   //tipagem do children como ReactNode, porque lá no _app.tsx o <Component {...pageProps} /> é um componente React
   children: ReactNode 
}

// quando criado o contexto, indica que é do tipo ChallengesContextData
export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {
   const [level, setLevel] = useState(1)
   const [currentExperience, setCurrentExperience] = useState(0)
   const [challengesCompleted, setChallengesCompleted] = useState(0)
   const [activeChallenge, setActiveChallenge] = useState(null)
   
   const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

   useEffect(() => {
      Notification.requestPermission() /* solicita permissão no browser para enviar notificações. API nativa do navegador */
   },[])

   function levelUp() {
      setLevel(level + 1)
   }

   function startNewChallenge() {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
      const challenge = challenges[randomChallengeIndex]
      
      setActiveChallenge(challenge)

      /* tocar um audio ao liberar novo desafio. Audio() nativo do navegador */
      new Audio('/notification.mp3').play 

      /* cria a notificação que será enviada ao usuário. nativo do navegador */
      if ( Notification.permission === 'granted') {
         new Notification('Novo desafio liberado! 💪', {
            body: `Valendo ${challenge.amount}xp!`
         })
      }
   }

   function resetChallenge() {
      setActiveChallenge(null)
   }

   function completeChallenge() {
      if (!activeChallenge) {
         return //um return void
      }

      const { amount } = activeChallenge   

      let finalExperience = currentExperience + amount

      if (finalExperience >= experienceToNextLevel ) {
         finalExperience = finalExperience - experienceToNextLevel
         levelUp()
      }

      setCurrentExperience(finalExperience)
      setActiveChallenge(null)
      setChallengesCompleted(challengesCompleted + 1)
   }

   return (
      <ChallengesContext.Provider 
         value={{  /* tudo que o contexto disponibiliza */
            level, 
            currentExperience, 
            challengesCompleted, 
            activeChallenge,
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge
         }}>
         {children}
      </ChallengesContext.Provider>

   )
}