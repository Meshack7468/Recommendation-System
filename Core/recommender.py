import pickle

# Load data (stored locally in Core/)
movies = pickle.load(open("movies.pkl", "rb"))
similarity = pickle.load(open("similarity.pkl", "rb"))


# Return all movie titles
def get_movie_titles():
    return movies["title"].tolist()


# Recommendation function
def recommend_movies(movie):
    # Check if movie exists
    if movie not in movies["title"].values:
        return []

    # Fetch movie index
    movie_index = movies[movies["title"] == movie].index[0]

    # Get similarity scores
    distances = similarity[movie_index]

    # Sort movies based on similarity score
    movies_list = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )[1:10]

    # Build recommendations
    recommended_movies = [
        movies.iloc[i[0]].title for i in movies_list
    ]

    return recommended_movies