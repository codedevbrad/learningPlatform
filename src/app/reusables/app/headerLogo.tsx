import Link from "next/link"
import AppLogo from "./logo"

export default function HeaderLogo({ url } : { url: string }) {
  return (
    <div className="flex items-center">
      <Link href={ url }>
        <div>
            <AppLogo size={"small"} />
        </div>
      </Link>
    </div>
  );
}