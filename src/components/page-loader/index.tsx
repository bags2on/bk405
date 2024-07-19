import { ScaleLoader } from '@/components/ui/loader'

export function PageLoader() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ScaleLoader fallback />
    </div>
  )
}
