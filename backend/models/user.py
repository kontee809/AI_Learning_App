# models/user.py
from core.database import db
from sqlalchemy.sql import func
from sqlalchemy import Enum

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(Enum("TEACHER", "STUDENT", name="role_enum"), nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=func.now())

    # RELATIONSHIPS
    classes = db.relationship("Class", backref="teacher", lazy=True)
    assignments = db.relationship("Assignment", backref="assignment_teacher", lazy=True)

    def __repr__(self):
        return f"<User {self.email}>"
