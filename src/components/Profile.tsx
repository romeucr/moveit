import styles from '../styles/components/Profile.module.css'

export function Profile() {
   return (
      <div className={styles.profileContainer}>
         <img src="https://github.com/romeucr.png" alt="Romeu Castro"/>
         <div>
            <strong>Romeu Castro Rodrigues</strong>
            <p>
               <img src="icons/level.svg" alt="Level arrow"/> {/* no next.js tudo que está na pasta public basta acessar assim */}
               Level 1
            </p>
         </div>
      </div>
   )
}