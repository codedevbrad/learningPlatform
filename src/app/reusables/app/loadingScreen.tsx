import Title from "../content/title"
import AppLogo from "./logo"

import AppVersion from "./appVersion"

export default function AppLoadingScreen ( ) {
    return (
        <div className='bg-white flex w-full h-full fixed z-40 flex-col justify-center items-center'>
            <AppLogo />
            <Title title="Coding Bootcamp" variant="heading" noMargin={false} />
            <AppVersion />
        </div>
    )
}