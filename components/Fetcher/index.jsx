import { useState, useEffect } from 'react';
import { Spinner } from '../Spinner';
import { ErrorInfo } from '../Error';

export function Fetcher({ url, onLoad, children }) {
    const
        [data, setData] = useState(null),
        [error, setError] = useState(null);
    console.log('Fetcher render');
    useEffect(() => {
        setData(null);
        setError(null);
        async function go() {
            try {
                const
                    response = await fetch(url);
                if (!response.ok) throw new Error(response.status + response.statusText);
                onLoad(await response.json());
                setData(true);
            } catch (err) {
                setError(err);
            }
        };
        go();
    }, [url]);
    if (error)
        return <ErrorInfo error={error} />
    if (data)
        return <>{children}</>
    return <Spinner />;

}