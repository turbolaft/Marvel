import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={1}
    width={350}
    height={200}
    viewBox="0 0 400 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="10" /> 
    <rect x="48" y="26" rx="3" ry="3" width="52" height="10" /> 
    <rect x="0" y="56" rx="3" ry="3" width="380" height="10" /> 
    <rect x="0" y="72" rx="3" ry="3" width="380" height="10" /> 
    <rect x="0" y="88" rx="3" ry="3" width="178" height="10" /> 
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
)

export default MyLoader