import classes from './Film.module.css';
import { useEffect, useState } from 'react';

export default function GetFilms() {
    const
        [films, setFilms] = useState([]),
        [error, setError] = useState(null),
        [value, setValue] = useState('red');
    useEffect(() => {
        async function fetchFilms() {
            try {
                setError(null);
                const
                    indexPage = 1,
                    url = new URL('http://www.omdbapi.com/?apikey=f7517aad&s=' + value + '&page=' + indexPage),
                    res = await fetch(url);

                if (!res.ok) throw (new Error(res.status));
                const
                    u = await res.json();
                setFilms(u);

            } catch (err) {
                console.log('catch', err);
                setError(err);
            }
        };
        fetchFilms();

    }, [value]);

    if (error)
        return <div className={classes.error}>Error: {error.toString()}</div>;
    if (!films)
        return <div className={classes.spinner}>loading...</div>;
    return <>
        <input value={value} onInput={event => setValue(event.currentTarget.value)} />

        <button >Click me</button>
        {(films) && <Films films={films.Search} />}

    </>;
}

export function Films({ films }) {

    return <div>
        {console.log(films)}
        
        {[...films].map(f => <Film film={f} key={f.imdbID}/>)}
    </div>;

}


function Film({ film }) {
    return <fieldset>
        <legend> film: {film.imdbID}</legend>
        <span > {film.Title} </span>
        <span>{film.Year}</span>
        <span>{film.Type}</span>
        <img src={film.Poster} />
    </fieldset>;
}