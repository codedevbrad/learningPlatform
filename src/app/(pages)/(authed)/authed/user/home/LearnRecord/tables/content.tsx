import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
        
export default function ContentTable ( ) {
    return (
        <Table>

         <TableCaption> A list of the Content you like / have worked on or completed. </TableCaption>

        <TableHeader>
            <TableRow>
                <TableHead>
                    Content title 
                </TableHead>
                <TableHead>
                    Listed as
                </TableHead>
                <TableHead> 
                    Difficulty
                </TableHead>
                <TableHead>
                    Status 
                </TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            <TableRow>
                <TableCell className="font-medium"> Building rest api's </TableCell>
                <TableCell className="font-medium"> Saved to complete </TableCell>
                <TableCell className="font-medium"> hard </TableCell>
                <TableCell> 50% </TableCell>
            </TableRow>
        </TableBody>
        </Table>
    )
}