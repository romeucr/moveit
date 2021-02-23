import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
   const [time, setTime] = useState(25 * 60) /* 25 minutos em segundos */
   const [active, setActive] = useState(false)

   const minutes = Math.floor(time / 60)
   const seconds = time % 60

   /* padStart verifica se a string possui 2 caracteres e se nao adiciona 0 a esquerda(start) 
      [minuteLeft, minuteRight]-> o split separa a string num array, neste caso array de dois elementos. 
      [minuteLeft, minuteRight] é a desestruturação do array em duas variáveis
   */
   const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('') 
   const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('') 

   function startCountdown() {
      setActive(true)
   }

   useEffect(() => {
      if (active && time > 0) {
         setTimeout(() => { /* setTimeout():  fazer com que algo acontece depois de um tempo (1000 milessegundos, 1 segundo) */
            setTime(time - 1)
         }, 1000) 
      }

   },[active, time])

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
         <button 
            type="button" 
            className={styles.countdownButton}
            onClick={startCountdown}
         >
            Iniciar um ciclo
         </button>
      </div>
   )
}