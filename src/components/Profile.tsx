import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
   const { level } = useContext(ChallengesContext)
    
   return (
      <div className={styles.profileContainer}>
         <img src="/panda-avatar.png" alt="Romeu Castro"/>
         <div>
            <strong>Panda (convidado)</strong>
            <p>
               <img src="icons/level.svg" alt="Level arrow"/> {/* no next.js tudo que está na pasta public basta acessar assim */}
               Level {level}
            </p>
         </div>
      </div>
   )
}