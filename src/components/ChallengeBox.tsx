import { useContext } from 'react'
import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
   const hasActiveChallenge = true

   const contextData = useContext(ChallengesContext)

   return (
      <div className={styles.challengeBoxContainer}>
         { hasActiveChallenge ? (
            <div className={styles.challengeActive}>
               <header>Ganhe 400xp </header>
               <main>
                  <img src="icons/body.svg" />
                  <strong>Novo desafio</strong>
                  <p>Levante e faça uma caminhada de três minutos</p>
               </main>
               <footer>
                  <button
                     type="button"
                     className={styles.challengeFailButton}
                  >
                     Falhei
                     </button>
                  <button
                     type="button"
                     className={styles.challengeSucceededButton}
                  >
                     Completei
                     </button>
               </footer>

            </div>
         ) : (
               <div className={styles.challengeNotActive}>
                  <strong>Finalize um ciclo para receber um desafio</strong>
                  <p>
                     <img src="icons/level-up.svg" alt="Level Up" />
                        Avance de level completando desafios
                     </p>
               </div>
            )
         }
      </div>
   )
}