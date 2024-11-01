import { Fetcher } from "@/components/Fetcher";
import { useCallback, useState } from "react";
import { PopupWindow } from "../PopupWindow";
import classes from './Film.module.css';
import { SimpleTable } from "../ObjTable";
import { config } from "../configs/jsph";



export default function GetFilms() {
    const
        [films, setFilms] = useState(''),
        [value, setValue] = useState('red'),
        [status, setStatus] = useState(false),
        memoizedCallback = useCallback(
            () => setStatus(true),
            [],
        ),
        //пока одна страничка
        indexPage = 1,
        onload = useCallback(data => setFilms(data), []);

    return <>
        <input type='search' value={value} onInput={event => setValue(event.currentTarget.value)} />
        <button onClick={memoizedCallback}> Search </button>
        {console.log(films)}
        {(status) &&
            <Fetcher
                url={'https://www.omdbapi.com/?apikey=f7517aad&s=' + value + '&page=' + indexPage}
                onLoad={onload} type={true}>
                <Films data={films.Search} />
            </Fetcher>

        }
    </>
}

function Films({ data }) {
    if (!data) return <span>No found!</span>
    return <div className={classes.films}>
        {console.log(data)}
        {data.map(f => <Film film={f} key={f.imdbID} />)}
    </div>;
}

function Film({ film }) {
    const
        url = 'https://img.omdbapi.com/?apikey=f7517aad&i=' + film.imdbID,
        [visible, setVisible] = useState(false);

    return <div>
        <div className={classes.filminfo} onClick={() => setVisible(true)}>
            <div> <img height='300px' src={film.Poster} /></div>
            <div>  <SimpleTable data={film} config={config} type={false}/></div>
        </div>
        {/* <div onClick={() => setVisible(false)}>  */}


        <div className={classes.filmmodal} onContextMenu={(event) => { setVisible(false); event.preventDefault(); }}>
            {visible && <PopupWindow >
                <button onClick={() => setVisible(false)} > Close ❌ </button>
                <Fetcher url={url}>
                    <img src={url}  />
                </Fetcher>
            </PopupWindow>}
        </div>
    </div>;
}


