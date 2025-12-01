# models/exam_answer.py
from core.database import db
from sqlalchemy.sql import func

class ExamAnswer(db.Model):
    __tablename__ = "exam_answers"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    exam_code_id = db.Column(db.BigInteger, db.ForeignKey("exam_codes.id"), nullable=False)

    question_number = db.Column(db.Integer, nullable=False)
    correct_option = db.Column(db.String(1), nullable=False)  # A/B/C/D

    created_at = db.Column(db.TIMESTAMP, server_default=func.now())
    updated_at = db.Column(
        db.TIMESTAMP,
        server_default=func.now(),
        server_onupdate=func.now()
    )

    def __repr__(self):
        return f"<ExamAnswer Q{self.question_number}={self.correct_option}>"
