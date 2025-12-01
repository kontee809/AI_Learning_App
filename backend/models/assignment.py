# models/assignment.py
from core.database import db
from sqlalchemy.sql import func

class Assignment(db.Model):
    __tablename__ = "assignments"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    class_id = db.Column(db.BigInteger, db.ForeignKey("classes.id"), nullable=False)
    teacher_id = db.Column(db.BigInteger, db.ForeignKey("users.id"), nullable=False)

    title = db.Column(db.String(200), nullable=False)
    question_count = db.Column(db.Integer, nullable=False)
    max_score = db.Column(db.Integer, nullable=False)

    created_at = db.Column(db.TIMESTAMP, server_default=func.now())
    updated_at = db.Column(
        db.TIMESTAMP,
        server_default=func.now(),
        server_onupdate=func.now()
    )

    # RELATIONSHIPS
    exam_codes = db.relationship("ExamCode", backref="assignment_data", lazy=True)

    def __repr__(self):
        return f"<Assignment {self.title}>"
