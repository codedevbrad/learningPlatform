import { useState, useEffect, useRef } from 'react'

const useFetchData = (fetchFunction , fetchKey ) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(false);

        const fetchData = async () => {
            try {
                console.log( 'fetching', fetchKey )
                console.log( data )
                const result = await fetchFunction();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchFunction]);

    return { data, loading, error, setData };
};

export default useFetchData;