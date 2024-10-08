import { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'

interface BadgeProps {
  max?: number
  color?: string
  children: ReactNode
  content?: string | number
  className?: string
  dotClassName?: string
}

export function Badge({
  children,
  content,
  color = '#ff2727',
  max = 100,
  className,
  dotClassName
}: BadgeProps) {
  let show = ''

  if (typeof content === 'number') {
    show = String(content)
    if (content > max) {
      show = max + '+'
    }
  } else {
    show = content || ''
    if (show.length > max) {
      show = max + '+'
    }
  }

  return (
    <span className={clsx(styles.container, className)}>
      {children}
      <span
        className={clsx(styles.dot, content ? styles.visibleIn : styles.visibleOut, dotClassName)}
        style={{
          backgroundColor: color
        }}
      >
        {show}
      </span>
    </span>
  )
}
