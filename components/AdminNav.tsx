'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type AdminNavProps = {
    role: string;
};

const navClass =
    'mt-9 grid gap-[7px] max-[760px]:mt-5 max-[760px]:grid-cols-3';
const linkBaseClass =
    'rounded-[9px] px-3 py-[11px] text-sm font-bold no-underline transition-colors duration-[160ms] hover:bg-[rgba(255,255,255,0.1)] hover:text-white max-[760px]:px-2 max-[760px]:py-2.5 max-[760px]:text-center';
const activeLinkClass = 'bg-[rgba(255,255,255,0.14)] text-white';
const inactiveLinkClass = 'text-[#dfe6ff]';

export function AdminNav({ role }: AdminNavProps) {
    const pathname = usePathname();

    function getLinkClass(href: string) {
        const isActive =
            href === '/admin' ? pathname === href : pathname.startsWith(href);

        return `${linkBaseClass} ${
            isActive ? activeLinkClass : inactiveLinkClass
        }`;
    }

    return (
        <nav className={navClass}>
            <Link className={getLinkClass('/admin')} href="/admin">
                Visitors
            </Link>

            <Link
                className={getLinkClass('/admin/statistics')}
                href="/admin/statistics"
            >
                Statistics
            </Link>

            {role === 'SUPER_ADMIN' && (
                <Link
                    className={getLinkClass('/admin/users')}
                    href="/admin/users"
                >
                    Admin Users
                </Link>
            )}
        </nav>
    );
}
