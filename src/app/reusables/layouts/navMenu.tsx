import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Title from "../content/title"; 
import getGradientBackground from "../svggradients/gradientBackground";

// Utility function to normalize paths by removing trailing slashes
const normalizePath = (path) => path.replace(/\/+$/, '');

// Utility function to get the base path up to a specified depth
const getBasePath = (path, depth) => {
  return path.split('/').slice(0, depth + 1).join('/');
};


function CardComponent({ colorChosen = 'red', emoji = '🔥', each }) {
  const gradientBackground = getGradientBackground(colorChosen);

  return (              
    <NavigationMenuLink key={each.title}>   
      <Link href={each.href} legacyBehavior passHref>
          <Card className={`cursor-pointer relative mr-5 min-w-[200px] h-[125px] flex justify-center items-center overflow-hidden ${gradientBackground}`}>
              {/* Emoji Layer */}
              <div className="absolute top-8 inset-0 flex justify-center items-center">
                  <span className="text-white text-4xl">{emoji}</span>
              </div>

              {/* Title Layer */}
              <div className="relative z-10">
                  <Title title={each.title} variant={'subheading3'} noMargin={false} className="text-white" />
              </div>
          </Card>
      </Link>
    </NavigationMenuLink>
  );
}


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
        <NavigationMenuContent className="z-50 bg- min-w-96 min-h-36 flex flex-col justify-center py-5 px-7">
            <div className="flex flex-row"> 
                { subLinks.map((each) => (
                   <CardComponent colorChosen={ each.colorChosen } each={ each } emoji={ each.emoji } />
                ))}
            </div>
        </NavigationMenuContent>
      )}
    </NavigationMenuItem>
  );
  
};//   className={`${navigationMenuTriggerStyle()} ${getBasePath(normalizePath(each.href), basePathDepth) === basePathname ? '' : 'bg-black'} text-white text-sm`}