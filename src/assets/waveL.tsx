interface Prop {
    width : string
    height : string
}

export const Wave3 = ( prop : Prop ) => {
    return (
        <>
            <svg width={prop.width} height={prop.height} viewBox="0 0 291 963" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_18_28)">
                    <path d="M2.5977 0.280041L18.1771 48.4182C33.7565 96.5563 64.9154 192.833 90.7744 289.063C116.234 385.289 137.393 481.478 120.253 577.332C103.714 673.19 48.8763 768.714 32.3369 864.573C15.1976 960.427 36.3569 1056.62 29.8171 1152.56C23.6774 1248.51 -9.16129 1344.23 -25.5806 1392.09L-42 1439.94L-41.58 1391.95C-41.1601 1343.95 -40.3201 1247.95 -39.4802 1151.96C-38.6403 1055.96 -37.8004 959.963 -36.9604 863.967C-36.1205 767.971 -35.2806 671.974 -34.4406 575.978C-33.6007 479.982 -32.7608 383.985 -31.9209 287.989C-31.0809 191.993 -30.241 95.9964 -29.821 47.9982L-29.4011 6.56102e-05L2.5977 0.280041Z" fill="#007AFF"/>
                </g>
                <defs>
                    <clipPath id="clip0_18_28">
                        <rect width="1440" height="320" fill="white" transform="translate(290.587 2.7998) rotate(90.5013)"/>
                    </clipPath>
                </defs>
            </svg>
        
        </>

    )
}
