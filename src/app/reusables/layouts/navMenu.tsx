import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { UrlObject } from "url"

export default function NavMenu({ link, subLinks }) {
  // Determine if subLinks are provided and not empty
  const hasSubLinks = subLinks && subLinks.length > 0;

  return (
    <NavigationMenuItem className="mx-5">
      {/* Conditionally render NavigationMenuTrigger as a link or not based on subLinks */}
      {!hasSubLinks ? (
        // If there are no subLinks, render the title as a clickable link (assuming there's a default URL)
          <div className="ml-4">
              <a href={ link.href }>{link.title}</a>
          </div>
      ) : (
        // If there are subLinks, render the title as a regular trigger
        <NavigationMenuTrigger>
          {link.title}
        </NavigationMenuTrigger>
      )}
      {/* Conditionally render NavigationMenuContent if subLinks are provided */}
      {hasSubLinks && (
        <NavigationMenuContent className="z-50 bg-white min-w-96 min-h-36 flex flex-col justify-center py-5 px-7"> 
          {subLinks.map((each) => (
            <NavigationMenuLink className="my-3 ml-2" key={each.title}> {/* Ensure to use a key for list items */}
              <Link href={each.href}>{each.title}</Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      )}
    </NavigationMenuItem>
  );
}