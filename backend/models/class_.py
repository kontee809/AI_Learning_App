# models/class_.py
from core.database import db
from sqlalchemy.sql import func

class Class(db.Model):   # ← tên class vẫn là Class (đúng)
    __tablename__ = "classes"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    teacher_id = db.Column(db.BigInteger, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    join_code = db.Column(db.String(10), unique=True, nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=func.now(), nullable=False)

    members = db.relationship("ClassMember", backref="class_data", lazy=True)
    assignments = db.relationship("Assignment", backref="class_assignments", lazy=True)

    def __repr__(self):
        return f"<Class {self.name}>"
    
    