from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

from core.database import db
from models.assignment import Assignment
from models.class_ import Class

assignment_bp = Blueprint("assignment", __name__, url_prefix="/assignments")


# ---------- TẠO BÀI TẬP ----------
@assignment_bp.route("", methods=["POST"])
@jwt_required()
def create_assignment():
    claims = get_jwt()
    teacher_id = get_jwt_identity()  # string
    role = claims.get("role")

    if role != "TEACHER":
        return jsonify({"message": "Chỉ giáo viên mới được tạo bài tập"}), 403

    data = request.get_json() or {}
    class_id = data.get("class_id")
    title = data.get("title")
    max_score = data.get("max_score")
    question_count = data.get("question_count")

    if not class_id or not title or not max_score or not question_count:
        return jsonify({"message": "Thiếu dữ liệu (class_id, title, max_score, question_count)"}), 400

    # Kiểm tra lớp có thuộc giáo viên không
    my_class = Class.query.filter_by(id=class_id, teacher_id=teacher_id).first()
    if not my_class:
        return jsonify({"message": "Bạn không có quyền tạo bài tập cho lớp này"}), 403

    # Check trùng tên bài tập trong lớp
    exist = Assignment.query.filter_by(class_id=class_id, title=title).first()
    if exist:
        return jsonify({"message": "Tên bài tập đã tồn tại trong lớp này"}), 400

    # Tạo mới
    new_assign = Assignment(
        class_id=class_id,
        teacher_id=teacher_id,
        title=title,
        max_score=max_score,
        question_count=question_count
    )

    db.session.add(new_assign)
    db.session.commit()

    return jsonify({
        "message": "Tạo bài tập thành công",
        "assignment": {
            "id": new_assign.id,
            "class_id": new_assign.class_id,
            "title": new_assign.title,
            "max_score": new_assign.max_score,
            "question_count": new_assign.question_count,
            "created_at": new_assign.created_at.isoformat()
        }
    }), 201


# ---------- LẤY DANH SÁCH BÀI TẬP THEO LỚP ----------
@assignment_bp.route("/class/<int:class_id>", methods=["GET"])
@jwt_required()
def get_assignments_by_class(class_id):
    teacher_id = get_jwt_identity()
    claims = get_jwt()

    # Kiểm tra quyền
    my_class = Class.query.filter_by(id=class_id, teacher_id=teacher_id).first()
    if not my_class:
        return jsonify({"message": "Bạn không có quyền xem bài tập lớp này"}), 403

    assigns = (
        Assignment.query
        .filter_by(class_id=class_id)
        .order_by(Assignment.created_at.desc())
        .all()
    )

    result = [{
        "id": a.id,
        "title": a.title,
        "max_score": a.max_score,
        "question_count": a.question_count,
        "created_at": a.created_at.isoformat()
    } for a in assigns]

    return jsonify(result), 200
