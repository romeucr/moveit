import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
   return (
      <header className={styles.experienceBar}>
         <span>0 xp </span>
         <div className={styles.baseBar}>
            <div
               className={styles.evolutionBar}
               style={{ width: '50%' }} /* width inline style because it will change. */
            >  
               <span 
                  className={styles.currentExperience}
                  style={{ left: '50%' }}
               >
                  300 xp
               </span>
            </div>
         </div>
         <span>600 xp </span>
      </header>
   )
}