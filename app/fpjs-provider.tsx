import {
  FpjsProvider,
} from '@fingerprintjs/fingerprintjs-pro-react'
import { ReactNode } from 'react'

export default function FingerprintProvider({children}: {children: ReactNode}) {
  
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: `${process.env.NEXT_PUBLIC_FPJS_PUBLIC_API_KEY}`,
        region: 'us'
      }}
    >
      {children}
    </FpjsProvider>
  )
}