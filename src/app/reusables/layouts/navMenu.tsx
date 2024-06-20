import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { usePathname } from 'next/navigation'
import Link from "next/link"

// create possible combos to check or keep last link?
   // because when i open a page thats a sublink of link, the sublink shows as active, but not the parent link
      // is there a way to add the isActive to the NavigationMenuTrigger if any of its subLink Matchess?
        // the ${normalizePath(pathname) === normalizePath(each.href) ? 'bg-slate-100' : ''} needs to be passed up to the NavigationMenuTrigger
// Utility function to normalize paths by removing trailing slashes
const normalizePath = (path) => path.replace(/\/+$/, '');

export default function NavMenu({ link, subLinks }) {
  const pathname = usePathname();

  // Determine if subLinks are provided and not empty
  const hasSubLinks = subLinks && subLinks.length > 0;

  // Check if the current link is active
  const isActive = normalizePath(pathname) === normalizePath(link.href);

  return (
    <NavigationMenuItem>
      {!hasSubLinks ? (
        <div>
          <Link href={link.href} legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} mx-4 ${ isActive ? 'bg-slate-100' : ''}`}>
              {link.title}
            </NavigationMenuLink>
          </Link>
        </div>
      ) : (
        <NavigationMenuTrigger className={ `mx-4`}>
          {link.title}
        </NavigationMenuTrigger>
      )}
      {hasSubLinks && (
        <NavigationMenuContent className="z-50 bg-white min-w-96 min-h-36 flex flex-col justify-center py-5 px-7">
          {subLinks.map((each) => (
            <NavigationMenuLink className="my-3 ml-2" key={each.title}>
              <Link href={each.href} legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${normalizePath(pathname) === normalizePath(each.href) ? 'bg-slate-100' : ''}`}>
                  {each.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      )}
    </NavigationMenuItem>
  );
};