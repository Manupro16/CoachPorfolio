import React from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";

export interface NavLink {
    href: string;
    label: string;
    icon?: React.ReactNode;
}

const linkClasses = "font-sans text-sm tracking-tight text-gray-300 hover:text-gray-100 transition-colors duration-200 uppercase";


const getActiveLinkClasses = (isActive: boolean): string =>
    `${linkClasses} ${isActive ? 'font-bold text-gray-100 border-b-2 border-blue-400' : 'font-medium'} `;


const NavLinks: React.FC<{ links: NavLink[] }> = ({ links }: { links: NavLink[] }): JSX.Element => {
    const currentPath = usePathname();

    return (
        <ul className="flex list-none p-0 gap-6">
            {links.map((link) => (
                <li key={link.href} className="flex items-center">
                    <Link
                        className={getActiveLinkClasses(link.href === currentPath)}
                        href={link.href}
                        aria-label={link.label.toLowerCase()}
                    >
                        {link.icon || link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavLinks;