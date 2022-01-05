import React from 'react'
import { Link } from 'react-router-dom'

import styles from './home.module.css'

import ru_flag from '../../assets/ru_flag.png';
import us_flag from '../../assets/us_flag.png';

const Home = () => {
  return (
    <section className={styles.home}>
      <h2 className={styles.title}>Йоу, выбирай сторону и поехали собирать войска!</h2>
      <div className={styles.sides}>
        <div>
          <Link to='/us'>
            <img src={us_flag} alt='us_flag' />
            <p>US ARMY</p>
          </Link>
        </div>
        <div>
          <Link to='/ru'>
            <img src={ru_flag} alt='ru_flag' />
            <p>ВС РФ</p>
          </Link>
        </div>
      </div>
      <div className={styles.instructions}>
        <h2>Как делать закуп?</h2>
        <ol>
          <li>Выбираете сторону и тип клопа</li>
          <li>Выбираете нужные вам юниты, используя поиск и здравый смысл</li>
          <li>В разделе закупа выбираете "копировать", либо копируете закуп лапками</li>
          <li>Отправляете свой закуп организатору CLOP'а</li>
        </ol>
      </div>
    </section>
  )
}

export { Home };