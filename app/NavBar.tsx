"use client";

import Link from "next/link";
import React from "react";
import copyText from "./copyText";
import paths from "./paths";
import { usePathname } from "next/navigation";
import { MdOutlineSkateboarding } from "react-icons/md";
import classnames from "classnames";

type Link = {
  href: string;
  label: string;
};

const NavBar = () => {
  const currentPath = usePathname();

  const links: Link[] = [
    { href: paths.dashboard, label: copyText.navBar_dashboard },
    { href: paths.issues, label: copyText.navBar_issues },
  ];

  return (
    <nav className="flex border-b h-14 items-center mb-5 px-5 space-x-6">
      {/* Logo */}
      <Link children={<MdOutlineSkateboarding />} href={paths.dashboard} />

      {/* Nav Items */}
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              "text-black": link.href === currentPath,
              "text-gray-500": link.href !== currentPath,
              "hover:text-black transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
        <li></li>
      </ul>
    </nav>
  );
};

export default NavBar;
