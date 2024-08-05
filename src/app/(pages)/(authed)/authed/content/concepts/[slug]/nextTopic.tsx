'use server'

import Title from '@/app/reusables/content/title'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { action__getNextTopic } from './actions'

export default async function NextTopicCard ( { topicPos }) {

    let topic = await action__getNextTopic( { position : topicPos } );

    console.log( topic )

    if ( !topic ) {
        return null;
    }

    return (
        <div className='mt-auto mb-[30px] w-full flex justify-end'>
            <Card className="w-[400px]">
                <CardHeader>
                    <div className='flex justify-end'> 
                        <span className='bg-black text-white px-4 py-1 text-sm rounded-lg'> Up next </span>     
                    </div>
                </CardHeader>
                
                <CardContent>
                    <Title title={ topic.title } variant='subheading1' noMargin={false} />
                    <p className='text-sm'>
                      { topic?.description }
                    </p>
                </CardContent>

                <CardFooter>
                    <Link href={ `/authed/content/concepts/${ topic.id }` }> 
                        <Button> View concept </Button>
                    </Link>
                </CardFooter> 
            </Card>
        </div>
    )
}