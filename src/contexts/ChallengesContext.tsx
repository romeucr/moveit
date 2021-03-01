import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'
//quando a biblioteca importada apresenta esses ... é porque é feita em JS e não reconhece o Typescript. Os @types precisam ser instalados de uma terceira fonte: Definitely Type
// é um repo da comunidade que contém tipagem TS de várias bibliotecas JS que não disponibilizam por padrão. É o caso da js-cookie
import Cookies from 'js-cookie'

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
   closeLevelUpModal: () => void
}

interface ChallengesProviderProps {
   //tipagem do children como ReactNode, porque lá no _app.tsx o <Component {...pageProps} /> é um componente React
   children: ReactNode
   level: number
   currentExperience: number
   challengesCompleted: number
}

// quando criado o contexto, indica que é do tipo ChallengesContextData
export const ChallengesContext = createContext({} as ChallengesContextData)

//rest é um objeto que contém o resto das props, tirando children
export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
   const [level, setLevel] = useState(rest.level ?? 1)
   const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
   const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
   const [activeChallenge, setActiveChallenge] = useState(null)
   const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)


   //calculando a experiencia para o proximo nivel
   const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

   useEffect(() => {
      Notification.requestPermission() /* solicita permissão no browser para enviar notificações. API nativa do navegador */
   }, [])

   useEffect(() => {
      //salvando as informações em cookies
      Cookies.set('level', String(level))
      Cookies.set('currentExperience', String(currentExperience))
      Cookies.set('challengesCompleted', String(challengesCompleted))
   }, [level, currentExperience, challengesCompleted])

   function closeLevelUpModal() {
      setIsLevelUpModalOpen(false)
   }

   function levelUp() {
      setLevel(level + 1)
      setIsLevelUpModalOpen(true)
   }

   function startNewChallenge() {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
      const challenge = challenges[randomChallengeIndex]

      setActiveChallenge(challenge)

      /* tocar um audio ao liberar novo desafio. Audio() nativo do navegador */
      new Audio('/notification.mp3').play

      /* cria a notificação que será enviada ao usuário. nativo do navegador */
      if (Notification.permission === 'granted') {
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

      if (finalExperience >= experienceToNextLevel) {
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
            completeChallenge,
            closeLevelUpModal
         }}>
         {children}
         { isLevelUpModalOpen && <LevelUpModal />} {/* && if sem else */}
      </ChallengesContext.Provider>

   )
}