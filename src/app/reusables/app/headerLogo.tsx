import Link from "next/link"
import AppLogo from "./logo"
import AppVersion from "./appVersion"

export default function HeaderLogo({ url } : { url: string }) {
  return (
    <div className="flex items-center">
      <Link href={ url }>
        <div className="flex flex-row items-center">
            <AppLogo  />
            <AppVersion size={undefined} />
        </div>
      </Link>
    </div>
  );
}