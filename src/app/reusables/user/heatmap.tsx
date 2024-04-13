import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import Title from '../content/title'

export default function Userheatmap( { dates } ) {
    return (
        <div className="my-3 border-gray-200 rounded-md border p-4 shadow-sm shadow-gray-200 bg-white">
            <Title title="Your activity" variant="subheading2" />
            <CalendarHeatmap
                startDate={new Date('2016-01-01')}
                endDate={new Date('2016-04-01')}
                values={[
                { date: '2016-01-01', count: 12 },
                { date: '2016-01-22', count: 122 },
                { date: '2016-01-30', count: 38 },
                // ...and so on
                ]}
            />    
        </div>
    
    )
}