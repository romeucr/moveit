import { createContext, ReactNode, useState } from 'react'

interface ChallengesContextData {
   level: number
   currentExperience: number 
   challengesCompleted: number
   levelUp: () => void //tipando que é uma função que não tem retorno
   startNewChalenge: () => void
}

interface ChallengesProviderProps {
   //tipagem do children como ReactNode, porque lá no _app.tsx o <Component {...pageProps} /> é um componente React
   children: ReactNode 
}

export const ChallengesContext = createContext({} as ChallengesContextData) // quando criado o contexto, indica que é do tipo ChallengesContextData


export function ChallengesProvider({ children }: ChallengesProviderProps) {
   const [level, setLevel] = useState(1)
   const [currentExperience, setCurrentExperience] = useState(0)
   const [challengesCompleted, setChallengesCompleted] = useState(0)

   function levelUp() {
      setLevel(level + 1)
   }

   function startNewChalenge() {
      console.log('New Challenge')
   }

   return (
      <ChallengesContext.Provider 
         value={{ 
            level, 
            currentExperience, 
            challengesCompleted, 
            levelUp,
            startNewChalenge
         }}>
         {children}
      </ChallengesContext.Provider>

   )
}