// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

const moviesTestArray = [
    {
      title: 'The Shawshank Redemption',
      year: 1993,
      director: 'Frank Darabont',
      duration: '2h',
      genre: ['Crime', 'Drama'],
      score: 9.3
    },
    {
      title: 'The Godfather',
      year: 1972,
      director: 'Francis Ford Coppola',
      duration: '2h',
      genre: ['Crime', 'Drama'],
      score: 9.2
    },
    {
      title: 'The Godfather: Part II',
      year: 1974,
      director: 'Francis Ford Coppola',
      duration: '3h 22min',
      genre: ['Crime', 'Drama'],
      score: 9
    },
    {
      title: 'The Dark Knight',
      year: 2008,
      director: 'Christopher Nolan',
      duration: '2h 32min',
      genre: ['Action', 'Crime', 'Drama', 'Thriller'],
      score: 9
    },
    {
      title: '12 Angry Men',
      year: 1957,
      director: 'Sidney Lumet',
      duration: '1h 36min',
      genre: ['Crime', 'Drama'],
      score: 8.9
    },
    {
      title: 'Schindler"s List',
      year: 1993,
      director: 'Steven Spielberg',
      duration: '3h 15min',
      genre: ['Biography', 'Drama', 'History'],
      score: 8.9
    },
]

function getAllDirectors(moviesArray) {
    return moviesArray.map(movie => {
        return movie.director;
    })
}

// 1.1 Bonus:
function getAllUniqueDirectors(moviesArray) {
    return moviesArray.reduce((acc, movie) => {
        if (!acc.includes(movie.director)) acc.push(movie.director);
        return acc;
    }, [])
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    return moviesArray.filter(movie => movie.genre.includes('Drama') && movie.director === 'Steven Spielberg').length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (!moviesArray.length) return 0;

    return Number((moviesArray.reduce((acc, movie) => {
        if (movie.score) return acc + movie.score;
        return acc;
    }, 0) / moviesArray.length).toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    return scoresAverage(moviesArray.filter((movie) => movie.genre.includes('Drama')));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    const moviesCopy = structuredClone(moviesArray);
    return moviesCopy.sort((a, b)=>{
        if (a.year !== b.year) return a.year - b.year;
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
    })
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    return moviesArray.map(movie => movie.title).sort().slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    return moviesArray.map((movie) => {
        const movieCopy = structuredClone(movie);
        const hours = parseInt(movie.duration.split(' ')[0] ?? 0);
        const minutes = parseInt(movie.duration.split(' ')[1] ?? 0);

        movieCopy.duration = 60 * hours + minutes;
        return movieCopy;
    })
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (!moviesArray.length) return null;

    const movieScoresByYear = {};
    moviesArray.forEach(movie => {
        if (movieScoresByYear[movie.year]) {
            movieScoresByYear[movie.year].push(movie.score);
        } else {
            movieScoresByYear[movie.year] = [movie.score]
        }
    });

    let bestAvg = -Infinity;
    let bestYear;
    for (const year in movieScoresByYear) {
        const totalScoreThisYear = movieScoresByYear[year].reduce((acc, score) => acc + score);
        const avgScoreThisYear = totalScoreThisYear / movieScoresByYear[year].length;
        if (avgScoreThisYear > bestAvg) {
            bestAvg = avgScoreThisYear;
            bestYear = year;
        }
    }

    return `The best year was ${bestYear} with an average score of ${bestAvg}`
}
