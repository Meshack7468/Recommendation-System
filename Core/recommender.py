import os
import pickle
import pandas as pd
import gdown

# Google Drive file IDs
MOVIES_FILE_ID = "1pmBMgtLnU8jNQci75aRmUX95SvPcC2Q4"
SIMILARITY_FILE_ID = "1TvpvjIfNkZM9g_D7CdItlZCcC3IVkyBf"


# Download helper
def download_file(file_id, output_name):
    if not os.path.exists(output_name):
        url = f"https://drive.google.com/uc?id={file_id}&export=download"
        gdown.download(url, output_name, quiet=False)

# Download models
download_file(MOVIES_FILE_ID, "movies.pkl")
download_file(SIMILARITY_FILE_ID, "similarity.pkl")

# Load data
movies = pickle.load(open('movies.pkl', 'rb'))
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