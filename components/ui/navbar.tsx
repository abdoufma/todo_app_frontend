import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="p-4 shadow-md w-full fixed top-0">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <span className="text-lg font-bold">Todo App</span>
                <NavigationMenu>
                    <NavigationMenuList className="flex space-x-4">
                        <NavigationMenuItem>
                            <Link href="/" passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    One
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/about" passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    More
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/contact" passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Thing
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    );
}