from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

from core.database import db
from models.class_ import Class

class_bp = Blueprint("class", __name__, url_prefix="/classes")


# ---------- TẠO LỚP ----------
@class_bp.route("", methods=["POST"])
@jwt_required()
def create_class():
    claims = get_jwt()
    teacher_id = int(get_jwt_identity())  # ← ép về int
    role = claims.get("role")

    if role != "TEACHER":
        return jsonify({"message": "Chỉ giáo viên mới được tạo lớp"}), 403

    data = request.get_json() or {}
    name = data.get("name")
    join_code = data.get("join_code")

    if not name or not join_code:
        return jsonify({"message": "Thiếu name hoặc join_code"}), 400

    existing_name = Class.query.filter_by(teacher_id=teacher_id, name=name).first()
    if existing_name:
        return jsonify({"message": "Tên lớp này đã tồn tại. Hãy chọn tên khác."}), 400

    existing_code = Class.query.filter_by(join_code=join_code).first()
    if existing_code:
        return jsonify({"message": "Mã tham gia đã tồn tại, hãy random lại"}), 400

    new_class = Class(
        teacher_id=teacher_id,
        name=name,
        join_code=join_code
    )

    db.session.add(new_class)
    db.session.commit()

    return jsonify({
        "message": "Tạo lớp thành công",
        "class": {
            "id": new_class.id,
            "name": new_class.name,
            "join_code": new_class.join_code,
            "created_at": new_class.created_at.isoformat(),
            "num_students": 0
        }
    }), 201


# ---------- LẤY DANH SÁCH LỚP ----------
@class_bp.route("/my", methods=["GET"])
@jwt_required()
def get_my_classes():
    claims = get_jwt()
    teacher_id = int(get_jwt_identity())
    role = claims.get("role")

    if role != "TEACHER":
        return jsonify({"message": "Chỉ giáo viên mới xem được danh sách lớp"}), 403

    classes = (
        Class.query
        .filter_by(teacher_id=teacher_id)
        .order_by(Class.created_at.desc())
        .all()
    )

    result = []
    for c in classes:
        result.append({
            "id": c.id,
            "name": c.name,
            "join_code": c.join_code,
            "created_at": c.created_at.isoformat(),
            "num_students": len(c.members)
        })

    return jsonify(result), 200
