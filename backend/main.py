from typing import Annotated
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import get_db, engine
from models import Base, Forum, Post
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

dp_dependency = Annotated[Session, Depends(get_db)]

Base.metadata.create_all(bind=engine)

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)

@app.post("/forums/")
def create_forum(name: str, db: dp_dependency):
    forum = Forum(name=name)
    db.add(forum)
    db.commit()
    db.refresh(forum)
    return forum

# Get all forums
@app.get("/forums/")
def read_forums(db: dp_dependency):
    return db.query(Forum).all()

# Create a post in a forum
@app.post("/forums/{forum_id}/posts/")
def create_post(forum_id: int, title: str, content: str, db: dp_dependency):
    forum = db.query(Forum).filter(Forum.id == forum_id).first()
    if not forum:
        raise HTTPException(status_code=404, detail="Forum not found")
    post = Post(title=title, content=content, forum_id=forum_id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

# Get all posts in a forum
@app.get("/forums/{forum_id}/posts/")
def read_posts(forum_id: int, db: dp_dependency):
    return db.query(Post).filter(Post.forum_id == forum_id).all()