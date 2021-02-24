import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout // node.js.timeout -> tipo da variável

export function Countdown() {
   const [time, setTime] = useState(0.05 * 60) /* 25 minutos em segundos */
   const [isActive, setIsActive] = useState(false)
   const [hasFinished, setHasFinished] = useState(false);

   const minutes = Math.floor(time / 60)
   const seconds = time % 60

   /* padStart verifica se a string possui 2 caracteres e se nao adiciona 0 a esquerda(start) 
      [minuteLeft, minuteRight]-> o split separa a string num array, neste caso array de dois elementos. 
      [minuteLeft, minuteRight] é a desestruturação do array em duas variáveis
   */
   const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
   const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

   function startCountdown() {
      setIsActive(true)
   }

   function resetCountdown() {
      // Evita a execução do timeout após um segundo. Ao setar isActive para false, o setTimeout já foi executado e irá diminuir ainda 1 segundo. 
      // Aqui esse comportamento é cancelado
      clearTimeout(countdownTimeout)
      setIsActive(false);
      setTime(0.05 * 60)
   }

   useEffect(() => {
      if (isActive && time > 0) {
         countdownTimeout = setTimeout(() => { /* setTimeout():  fazer com que algo acontece depois de um tempo (1000 milessegundos, 1 segundo) */
            setTime(time - 1)
         }, 1000)
      } else if (isActive && time === 0) {
         setHasFinished(true)
         setIsActive(false)
      }

   }, [isActive, time])

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