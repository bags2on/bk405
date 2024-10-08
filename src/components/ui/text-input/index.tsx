import { ChangeEvent } from 'react'
import clsx from 'clsx'
import { UseFormRegister, Path, FieldValues, FieldErrors } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'

import styles from './styles.module.scss'

export interface TextInputProps<T extends FieldValues> {
  name: Path<T>
  type?: string
  rows?: number
  label?: string
  disabled?: boolean
  multiline?: boolean
  maxLength?: number
  placeholder?: string
  autoComplete?: string
  hiddenLabel?: boolean
  hideErrorMessage?: boolean
  onChange?(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
  register: UseFormRegister<T>
  errors: FieldErrors
}

export function TextInput<T extends FieldValues>({
  name,
  autoComplete = 'off',
  hideErrorMessage = false,
  type = 'text',
  multiline = false,
  errors,
  label,
  register,
  ...restProps
}: TextInputProps<T>) {
  const { t } = useTranslation()
  const isErr = errors && errors[name]

  const message = isErr && t(errors[name]?.message as string)

  return (
    <div>
      {label && <span className={styles.label}>{label}</span>}
      {multiline ? (
        <textarea
          autoComplete={autoComplete}
          className={clsx(styles.multiline, isErr && styles.baseError)}
          {...register(name)}
          {...restProps}
        />
      ) : (
        <input
          type={type}
          autoComplete={autoComplete}
          className={clsx(styles.base, isErr && styles.baseError)}
          {...register(name)}
          {...restProps}
        />
      )}
      {!hideErrorMessage && (
        <p className={clsx(styles.errorMessage, isErr && styles.showMessage)}>{message}</p>
      )}
    </div>
  )
}
