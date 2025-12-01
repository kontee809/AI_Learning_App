# models/exam_code.py
from core.database import db
from sqlalchemy.sql import func

class ExamCode(db.Model):
    __tablename__ = "exam_codes"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    assignment_id = db.Column(db.BigInteger, db.ForeignKey("assignments.id"), nullable=False)

    code = db.Column(db.String(10), nullable=False)

    created_at = db.Column(db.TIMESTAMP, server_default=func.now())
    updated_at = db.Column(
        db.TIMESTAMP,
        server_default=func.now(),
        server_onupdate=func.now()
    )

    exam_answers = db.relationship("ExamAnswer", backref="exam_code_data", lazy=True)

    def __repr__(self):
        return f"<ExamCode {self.code}>"
