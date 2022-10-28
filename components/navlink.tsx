import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

type Props = {
    activeClassName?: string;
    href: string;
    children: React.ReactElement;
    exact?: boolean;
}

const NavLink = ({ children, activeClassName, href, exact=true, ...props }: Props) => {
  const { asPath } = useRouter()
    const child = React.Children.only(children)
    const childClassName = child.props.className || ""

    const className = asPath === href && exact
        ? `${childClassName} ${activeClassName}`.trim()
        : childClassName

    return <Link href={href} {...props}>{React.cloneElement(child, { className })}</Link>
}


export default NavLink; 