import cls from './Loader.module.scss'
import React, { type ReactNode } from 'react'

const Loader = (): ReactNode => {
  return (
        <div className={cls.kinetic_wrap}>
            <div className={cls.kinetic}>
            </div>
        </div>
  )
}

export default Loader
