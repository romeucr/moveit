import { useState, useEffect, useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
   const { 
      minutes, 
      seconds, 
      hasFinished, 
      isActive, 
      startCountdown, 
      resetCountdown } = useContext(CountdownContext)

   /* padStart verifica se a string possui 2 caracteres e se nao adiciona 0 a esquerda(start) 
      [minuteLeft, minuteRight]-> o split separa a string num array, neste caso array de dois elementos. 
      [minuteLeft, minuteRight] é a desestruturação do array em duas variáveis
   */
   const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
   const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

   return (
      <div>
         <div className={styles.countdownContainer}>
            <div>
               <span>{minuteLeft}</span>
               <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
               <span>{secondLeft}</span>
               <span>{secondRight}</span>
            </div>
         </div>

         { hasFinished ? (
            <button
               disabled
               className={styles.countdownButton}
            >
               Ciclo encerrado
            </button>
         ) : (
               <>
                  { isActive ? (
                     <button
                        type="button"
                        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                        onClick={resetCountdown}
                     >
                        Abandonar ciclo
                     </button>
                  ) : (
                        <button
                           type="button"
                           className={styles.countdownButton}
                           onClick={startCountdown}
                        >
                           Iniciar um ciclo
                        </button>
                     )
                  }
               </>
            )
         }

      </div>
   )
}