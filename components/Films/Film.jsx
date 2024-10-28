import { Fetcher } from "@/components/Fetcher";
import { useCallback, useState } from "react";
// import { ObjTable } from "@/components/ObjTable";
// import { config } from "@/components/configs/jsph";


export default  function GetFilms() {
    const
        [films, setFilms] = useState(''),
        [value, setValue] = useState('red'),
        [status, setStatus] = useState(false),
      memoizedCallback = useCallback(
            () =>  setStatus(true),
            [],
          ),
        indexPage = 1,
        onload = useCallback(data => setFilms(data), []);
    // useEffect(() => {
    //     async function fetchFilms() {
    //         try {
    //             setError(null);
    //             const
    //                 indexPage = 1,
    //                 url = new URL('http://www.omdbapi.com/?apikey=f7517aad&s=' + value + '&page=' + indexPage),
    //                 res = await fetch(url);

    //             if (!res.ok) throw (new Error(res.status));
    //             const
    //                 u = await res.json();
    //             setFilms(u);

    //         } catch (err) {
    //             console.log('catch', err);
    //             setError(err);
    //         }
    //     };
    //     fetchFilms();

    // }, [value]);

    // if (error)
    //     return <div className={classes.error}>Error: {error.toString()}</div>;
    // if (!films)
    //     return <div className={classes.spinner}>loading...</div>;


    return <>
        <input value={value} onInput={event => setValue(event.currentTarget.value)} />
        <button  onClick={memoizedCallback}> Click me </button>
        {console.log(films)}
       { (status) &&
        <Fetcher
            url={'http://www.omdbapi.com/?apikey=f7517aad&s=' + value + '&page=' + indexPage}
            onLoad={onload}>
            <Films data={films.Search} />
        </Fetcher>
       
       
        }
    </>
}


function Films({ data }) {
    if (!data) return <span>no found</span>
    return <div>
        {console.log(data)}
                {data.map(f => <Film film={f} key={f.id}/>)}
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