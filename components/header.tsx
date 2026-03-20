import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/bases/radix/components/ui/navigation-menu";
import Link from "next/link";

export const Header = () => (
  <header className="flex flex-row-reverse bg-primary px-4 py-2">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className={navigationMenuTriggerStyle()}>
          <Link href="/storybook">Storybook</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </header>
);
