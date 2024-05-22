// /components/NextBreadcrumb.tsx
'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import React from 'react'
import { usePathname } from 'next/navigation'

const NextBreadcrumb = ({ breadcrumbs }) => {
    const pathname = usePathname();
    const pathNames = pathname.split('/').filter(path => path);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathNames.map((link, index) => {
                    const href = `/${pathNames.slice(0, index + 1).join('/')}`;
                    const isActive = pathname === href;
                    const itemLink = link.charAt(0).toUpperCase() + link.slice(1);

                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                {isActive ? (
                                    <BreadcrumbPage className="text-black"> 
                                        {itemLink} 
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink className="text-gray-400" href={href}>
                                        {itemLink}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default NextBreadcrumb;