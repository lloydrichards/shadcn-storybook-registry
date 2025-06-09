import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export const Header = () => (
  <header className="bg-primary flex flex-row-reverse px-4 py-2">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className={navigationMenuTriggerStyle()}>
          <Link href="/storybook">Storybook</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </header>
);
