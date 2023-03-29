import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="134" cy="136" r="125" />
        <rect x="0" y="279" rx="10" ry="10" width="280" height="21" />
        <rect x="0" y="316" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="418" rx="10" ry="10" width="95" height="30" />
        <rect x="125" y="412" rx="25" ry="25" width="150" height="40" />
    </ContentLoader>
)

export default Skeleton

