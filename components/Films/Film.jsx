import { Fetcher } from "@/components/Fetcher";
import { useCallback, useState } from "react";
import { PopupWindow } from "../PopupWindow";
import classes from './Film.module.css';
// import { ObjTable } from "@/components/ObjTable";
// import { config } from "@/components/configs/jsph";


export default function GetFilms() {
    const
        [films, setFilms] = useState(''),
        [value, setValue] = useState('red'),
        [status, setStatus] = useState(false),
        memoizedCallback = useCallback(
            () => setStatus(true),
            [],
        ),
        indexPage = 1,
        onload = useCallback(data => setFilms(data), []);

    return <>
        <input type='search' value={value} onInput={event => setValue(event.currentTarget.value)} />
        <button onClick={memoizedCallback}> Click me </button>
        {console.log(films)}
        {(status) &&
            <Fetcher
                url={'https://www.omdbapi.com/?apikey=f7517aad&s=' + value + '&page=' + indexPage}
                onLoad={onload}>
                <Films data={films.Search} />
            </Fetcher>

        }
    </>
}

function Films({ data }) {
    if (!data) return <span>no found</span>
    return <div className={classes.film}>
        {console.log(data)}
        {data.map(f => <Film film={f} key={f.imdbID} />)}
    </div>;
}

function Film({ film }) {
    const
    [visible, setVisible] = useState(false);

    return <fieldset  onClick={() => setVisible(true)}>
        <legend> film: {film.imdbID}</legend>
        <span > {film.Title} </span>
        <span>{film.Year}</span>
        <span>{film.Type}</span>
        <img src={film.Poster} />


        {visible && <PopupWindow >
            <button onClick={() => setVisible(false)}>close</button>
            {/* <div onClick={() => setVisible(false)}> */}
            <img src={'https://img.omdbapi.com/?apikey=f7517aad&i=' + film.imdbID} />
            {/* </div> */}
            {/* <Fetcher
                url={'http://img.omdbapi.com/?apikey=f7517aad&i=' + film.imdbID}
                onLoad={onload}>
                                    
            </Fetcher> */}

        </PopupWindow>}
     
    </fieldset>;
}


//подробности о фильме по клику на картинку


//вывод в модальное окно

function FilmModal() {
    const
        [visible, setVisible] = useState(false);
    return <fieldset>
        <button onClick={() => setVisible(true)}>open</button>
        
    </fieldset>
}


