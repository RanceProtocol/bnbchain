import { FC, ReactNode } from "react"

interface Props {
    children: ReactNode
}

// all providers are wrapped around children here
const AppProvider:FC<Props> = ({children}) => {
  return (
      <div>
          {children}
      </div>
  )
}

export default AppProvider