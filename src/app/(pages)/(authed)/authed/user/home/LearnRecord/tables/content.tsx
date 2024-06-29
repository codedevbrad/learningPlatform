
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { action__fetchTopicsUsersWorkedWith } from "../actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function TopicsTable ( ) {

    let topics = await action__fetchTopicsUsersWorkedWith();

    console.log( topics );

    return (
        <Table>
            <TableCaption> A list of the Content you like / have worked on or completed. </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Topic 
                    </TableHead>
                    <TableHead>
                        Progress
                    </TableHead>
                    <TableHead>
                        Made notes
                    </TableHead>
                    <TableHead>
                        
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                { topics.map( ( each , index ) => 
                    <TableRow key={ index }>
                        <TableCell className="font-medium"> 
                            { each.topic.title } 
                        </TableCell>
                        <TableCell className="font-medium"> 
                            <Button variant={ !each.userProgress ? 'outline' : '' }>
                                 { each.userProgress ? 'completed' : 'not completed' }  
                            </Button>
                        </TableCell>
                        <TableCell className="font-medium"> 
                            { Object.keys( each.userNotes ).length > 0 ? 'notes written' : 'not made notes on' }
                        </TableCell>
                        <TableCell className="font-medium"> 
                            <Link href={ `/authed/content/concepts/${ each.topicId }` }>
                                <Button variant={'outline'}>
                                        View Topic
                                </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}