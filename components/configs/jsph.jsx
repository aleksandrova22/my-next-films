
export const config = {
        columns: [
        {title: 'Title', content: (films) => films.Title},
        {title: 'Year', content : (films) => films.Year},
        {title: 'img', content : (films) => <img src={films.Poster} />}
        ]
}