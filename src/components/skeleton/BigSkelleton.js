import React from 'react'
import ContentLoader from 'react-content-loader'

const BigSkelleton = () => (
    <ContentLoader
        width={200}
        height={318}
        viewBox="0 0 200 318"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="2" ry="2" width="200" height="318" />
    </ContentLoader>
)

export default BigSkelleton;