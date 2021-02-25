import { createContext, ReactNode, useState } from 'react'
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
   resetChallenge : () => void
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

   function levelUp() {
      setLevel(level + 1)
   }

   function startNewChallenge() {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
      const challenge = challenges[randomChallengeIndex]
      
      setActiveChallenge(challenge)
   }

   function resetChallenge() {
      setActiveChallenge(null)
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
            resetChallenge
         }}>
         {children}
      </ChallengesContext.Provider>

   )
}