import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { usePathname } from 'next/navigation';
import Link from "next/link";

/* 
NavMenu Component
  The NavMenu component is designed to create a navigation menu with support for active link highlighting. It includes both top-level links and sub-links, and allows for customization of which parts of the URL path are considered when determining the active state. This is particularly useful for matching base paths and ignoring long segments, such as IDs in URLs.

Component Props
  link: An object representing the main link. It should have the following properties:

href (string): The URL of the main link.
  title (string): The display text of the main link.
  subLinks: An array of objects representing the sub-links. Each object should have the following properties:

href (string): The URL of the sub-link.
  title (string): The display text of the sub-link.
  basePathDepth: An optional integer prop that specifies the depth of the URL path to consider when determining the active state. Default is 2.

Utility Functions
  normalizePath: A function that normalizes a given path by removing trailing slashes. This ensures consistent path comparison.

getBasePath: A function that extracts the base path up to a specified depth. This is used to match only the relevant part of the URL, ignoring segments beyond the specified depth.

Active State Logic
  The component checks if the main link or any of its sub-links is active by comparing the normalized current pathname with the base paths of the links.
  The basePathDepth prop is used to determine how much of the path to consider in the comparison. This allows for matching segments up to a certain depth and ignoring anything beyond that, such as long alphanumeric segments (e.g., IDs).
*/

// Utility function to normalize paths by removing trailing slashes
const normalizePath = (path) => path.replace(/\/+$/, '');

// Utility function to get the base path up to a specified depth
const getBasePath = (path, depth) => {
  return path.split('/').slice(0, depth + 1).join('/');
};

export default function NavMenu({ link, subLinks, basePathDepth = 2 }) {
  const pathname = usePathname();

  // Determine if subLinks are provided and not empty
  const hasSubLinks = subLinks && subLinks.length > 0;

  // Get the base path of the current pathname and the link's href
  const basePathname = getBasePath(normalizePath(pathname), basePathDepth);
  const baseLinkHref = getBasePath(normalizePath(link.href), basePathDepth);

  // Check if the current link is active based on the base path
  const isActive = basePathname === baseLinkHref;

  // Check if any sub-link is active based on the base path
  const isSubLinkActive = hasSubLinks && subLinks.some(subLink => getBasePath(normalizePath(subLink.href), basePathDepth) === basePathname);

  return (
    <NavigationMenuItem>
      {!hasSubLinks ? (
        <div>
          <Link href={link.href} legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} mx-4 ${isActive ? 'bg-slate-100' : ''}`}>
              {link.title}
            </NavigationMenuLink>
          </Link>
        </div>
      ) : (
        <NavigationMenuTrigger className={`mx-4 ${isSubLinkActive ? 'bg-slate-100' : ''}`}>
          {link.title}
        </NavigationMenuTrigger>
      )}
      {hasSubLinks && (
        <NavigationMenuContent className="z-50 bg-white min-w-96 min-h-36 flex flex-col justify-center py-5 px-7">
          {subLinks.map((each) => (
            <NavigationMenuLink className="my-3 ml-2" key={each.title}>
              <Link href={each.href} legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${getBasePath(normalizePath(each.href), basePathDepth) === basePathname ? 'bg-slate-100' : ''}`}>
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