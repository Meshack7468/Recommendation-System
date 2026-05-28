from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from recommender import recommend_movies, get_movie_titles

app = FastAPI(
    title="Movie Recommendation API",
    description="API for recommending similar movies using TF-IDF and cosine similarity",
    version="1.0"
)

# Enable frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body schema
class MovieRequest(BaseModel):
    movie: str


# Home route
@app.get("/")
def home():
    return {
        "message": "Movie Recommendation API is running"
    }


# Fetch movie titles for dropdown/autocomplete
@app.get("/movies")
def movies():
    return {
        "movies": get_movie_titles()
    }


# Recommendation endpoint
@app.post("/recommend")
def recommend(data: MovieRequest):

    movie_name = data.movie

    recommendations = recommend_movies(movie_name)

    if len(recommendations) == 0:
        raise HTTPException(
            status_code=404,
            detail="Movie not found"
        )

    return {
        "movie": movie_name,
        "recommendations": recommendations
    }