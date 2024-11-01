export const config = {
        columns: [
        {title: 'Title', content: (films) => films.Title},
        {title: 'Year', content : (films) => films.Year},
        {title: 'Type', content : (films) => films.Type},
        {title: 'imdbID', content: (films) => films.imdbID},
        {title: 'img', content : (films) => <img src={films.Poster} height={'60px'} />}
        ]
}