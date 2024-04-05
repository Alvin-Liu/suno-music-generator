import * as React from "react"

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-40 md:min-h-80">
      <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-yellow-500 animate-spin">
          </div>
      </div>
    </div>
  )
}

Loading.displayName = "Loading"

export { Loading }
