from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Forum(Base):
    __tablename__ = 'forums'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

    # Relationship to Post
    posts = relationship('Post', back_populates='forum')


class Post(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    forum_id = Column(Integer, ForeignKey('forums.id'), nullable=False)

    # Relationship to Forum
    forum = relationship('Forum', back_populates='posts')