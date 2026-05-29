import os
import pickle

import gdown

# Google Drive file IDs for the large pickle files
MOVIES_FILE_ID = "1pmBMgtLnU8jNQci75aRmUX95SvPcC2Q4"
SIMILARITY_FILE_ID = "1TvpvjIfNkZM9g_D7CdItlZCcC3IVkyBf"

DATA_DIR = "/data"
MOVIES_PATH = os.path.join(DATA_DIR, "movies.pkl")
SIMILARITY_PATH = os.path.join(DATA_DIR, "similarity.pkl")


def _download_if_missing(file_id: str, dest: str) -> None:
    """Download a file from Google Drive if it doesn't already exist locally."""
    if not os.path.exists(dest):
        url = f"https://drive.google.com/uc?id={file_id}"
        print(f"Downloading {dest} from Google Drive...")
        gdown.download(url, dest, quiet=False)
        print(f"Downloaded {dest} successfully.")
    else:
        print(f"Found existing file at {dest}, skipping download.")


# Ensure the volume mount directory exists
os.makedirs(DATA_DIR, exist_ok=True)

# Ensure pickle files are present, downloading from Google Drive if needed
_download_if_missing(MOVIES_FILE_ID, MOVIES_PATH)
_download_if_missing(SIMILARITY_FILE_ID, SIMILARITY_PATH)

# Load data
movies = pickle.load(open(MOVIES_PATH, "rb"))
similarity = pickle.load(open(SIMILARITY_PATH, "rb"))


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