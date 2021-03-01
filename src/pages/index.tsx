import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomePageProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home(props: HomePageProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head> {/* //coloca na head do html tudo que estiver aqui. Aqui somente o que for da home. Em _document.tsx o que for global */}
          <title>Início | move.it!</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

// para recuperar os dados dos cookies quando der F5 na página. Só funciona em páginas, em componentes não
// a função tem que ter esse nome e ser async. É uma das maneiras usadas quando utilizando Next.JS
// são definidos os dados que podem ser repassados pela camada do Next.js ao frontend React
// tudo executado na função é executado no lado do Next.js
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  //recupera todos os cookies da app
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level), //vem dos cookies como string, convertendo a number
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
