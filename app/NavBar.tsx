"use client";

import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineSkateboarding } from "react-icons/md";
import Skeleton from "./_components/Skeleton";
import copyText from "./copyText";
import paths from "./paths";

const STATUS_LOADING = "loading";
const STATUS_UNAUTHENTICATED = "unauthenticated";

type Link = {
  href: string;
  label: string;
};

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex align="center" justify="between">
          <Flex align="center" gap="3">
            {/* Logo */}
            <Link href={paths.dashboard}>{<MdOutlineSkateboarding />}</Link>
            <NavLinks />
          </Flex>
          <AuthActionMenu />
        </Flex>
      </Container>
    </nav>
  );
};

const AuthActionMenu = () => {
  const { data: session, status } = useSession();

  if (status === STATUS_LOADING) {
    return <Skeleton circle={true} height="1.75rem" width="2rem" />;
  }

  if (status === STATUS_UNAUTHENTICATED) {
    return (
      <Link className="nav-link h-8" href={paths.signIn}>
        <Flex align="center" height="100%">
          {copyText.buttonLabelSignIn}
        </Flex>
      </Link>
    );
  }

  return (
    <Box>
      {session?.user && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {/* With Google auth, users will always have a default image */}
            <Avatar
              className="cursor-pointer"
              fallback="?"
              radius="full"
              size="2"
              src={session.user.image ?? ""}
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>{session.user.email}</DropdownMenu.Label>
            <Link href={paths.singOut}>
              <DropdownMenu.Item className="cursor-pointer">
                <Flex justify="center" width="100%">
                  {copyText.buttonLabelSignOut}
                </Flex>
              </DropdownMenu.Item>
            </Link>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links: Link[] = [
    { href: paths.dashboard, label: copyText.navBarLabelDashboard },
    { href: paths.issues, label: copyText.navBarLabelIssues },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-black": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
