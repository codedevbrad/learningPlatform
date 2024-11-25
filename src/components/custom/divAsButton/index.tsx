import { buttonVariants } from "@/components/ui/button";

export default function DivAsButton ( { variant , children }) {
    return <div className={ buttonVariants({variant: variant || 'outline' })}>
        { children}
    </div>
}