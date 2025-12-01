# models/class_member.py
from core.database import db
from sqlalchemy.sql import func

class ClassMember(db.Model):
    __tablename__ = "class_members"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    class_id = db.Column(db.BigInteger, db.ForeignKey("classes.id"), nullable=False)
    student_id = db.Column(db.BigInteger, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=func.now())

    student = db.relationship("User", lazy=True)

    def __repr__(self):
        return f"<ClassMember class={self.class_id} student={self.student_id}>"
