"use client";
import * as React from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import Title from "../content/title";
import getGradientBackground from "../svggradients/gradientBackground";

// --------------------------------------------
// Types
// --------------------------------------------

/** Represents a single link item used in the menu. */
interface CardLink {
  title: string;
  href: string;
  colorChosen?: string;
  emoji?: string;
}

/** Props for the CardComponent. */
interface CardComponentProps {
  colorChosen?: string;
  emoji?: string;
  each: CardLink;
}

/** Props for the NavMenu. 
 *  `subLinks` can be an array of `CardLink` or a single React node.
 */
interface NavMenuProps {
  link: CardLink;
  subLinks?: CardLink[] | React.ReactNode;
  /** Determines how many segments of the path are matched for the "active" check. */
  basePathDepth?: number;
}

// --------------------------------------------
// Utility functions
// --------------------------------------------

/** Normalize paths by removing trailing slashes. */
function normalizePath(path: string): string {
  return path.replace(/\/+$/, "");
}

/** Get the base path up to a specified depth. */
function getBasePath(path: string, depth: number): string {
  return path.split("/").slice(0, depth + 1).join("/");
}

// --------------------------------------------
// Child Component: CardComponent
// --------------------------------------------

function CardComponent({
  colorChosen = "red",
  emoji = "🔥",
  each,
}: CardComponentProps) {
  const gradientBackground = getGradientBackground(colorChosen);

  return (
    <NavigationMenuLink key={each.title}>
      <Link href={each.href} legacyBehavior passHref>
        <Card
          className={`cursor-pointer relative mr-5 min-w-[200px] h-[125px] flex justify-center items-center overflow-hidden ${gradientBackground}`}
        >
          {/* Emoji Layer */}
          <div className="absolute top-12 inset-0 flex justify-center items-center">
            <span className="text-white text-4xl">{emoji}</span>
          </div>

          {/* Title Layer */}
          <div className="relative z-10 bottom-2">
            <Title
              title={each.title}
              variant={"subheading3"}
              noMargin={false}
              className="text-white"
            />
          </div>
        </Card>
      </Link>
    </NavigationMenuLink>
  );
}

// --------------------------------------------
// Main Component: NavMenu
// --------------------------------------------

export default function NavMenu({
  link,
  subLinks,
  basePathDepth = 2,
}: NavMenuProps) {
  const pathname = usePathname() ?? "";

  // Determine if `subLinks` is non-null
  const hasSubLinks = subLinks !== null && subLinks !== undefined;

  // If `subLinks` is an array, we can check for active states on each subLink
  const isArraySubLinks = Array.isArray(subLinks);

  // Get the base path of the current pathname and the link's href
  const basePathname = getBasePath(normalizePath(pathname), basePathDepth);
  const baseLinkHref = getBasePath(normalizePath(link.href), basePathDepth);

  // Check if the current link is active based on the base path
  const isActive = basePathname === baseLinkHref;

  // Check if any sub-link is active (only if subLinks is an array)
  const isSubLinkActive =
    isArraySubLinks &&
    subLinks.some(
      (subLink: CardLink) =>
        getBasePath(normalizePath(subLink.href), basePathDepth) === basePathname
    );

  return (
    <NavigationMenuItem>
      {/* If we do NOT have sublinks, render a direct link */}
      {!hasSubLinks ? (
        <div>
          <Link href={link.href} legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} mx-4 ${
                isActive ? "bg-slate-100" : ""
              }`}
            >
              {link.title}
            </NavigationMenuLink>
          </Link>
        </div>
      ) : (
        // Otherwise, we have a dropdown trigger
        <NavigationMenuTrigger
          className={`mx-4 ${isSubLinkActive ? "bg-slate-100" : ""}`}
        >
          {link.title}
        </NavigationMenuTrigger>
      )}

      {/* If we DO have sublinks (array or component), render them in the content */}
      {hasSubLinks && (
        <NavigationMenuContent className="z-50 min-w-96 min-h-36 flex flex-col justify-center py-5 px-7">
          {/* If subLinks is an array, map over them;
              if it's a component, just render it. */}
          {isArraySubLinks ? (
            <div className="flex flex-row">
              {subLinks.map((each: CardLink, index: number) => (
                <CardComponent
                  key={index}
                  colorChosen={each.colorChosen}
                  emoji={each.emoji}
                  each={each}
                />
              ))}
            </div>
          ) : (
            // `subLinks` is not an array, treat it as a single component
            <div className="flex flex-row">{subLinks}</div>
          )}
        </NavigationMenuContent>
      )}
    </NavigationMenuItem>
  );
}
