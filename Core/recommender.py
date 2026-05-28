import pickle
import pandas as pd

# Load saved dataframe
movies = pickle.load(open('movies.pkl', 'rb'))

# Load similarity matrix
similarity = pickle.load(open('similarity.pkl', 'rb'))


# Return all movie titles
def get_movie_titles():

    return movies['title'].tolist()


# Recommendation function
def recommend_movies(movie):

    # Check if movie exists
    if movie not in movies['title'].values:
        return []

    # Fetch movie index
    movie_index = movies[movies['title'] == movie].index[0]

    # Get similarity scores
    distances = similarity[movie_index]

    # Sort movies based on similarity
    movies_list = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )[1:10]

    recommended_movies = []

    for i in movies_list:

        recommended_movies.append(
            movies.iloc[i[0]].title
        )

    return recommended_movies