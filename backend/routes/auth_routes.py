from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

from core.database import db
from models.user import User

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")


# ------------ ĐĂNG KÝ ------------
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}

    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")  # "TEACHER" hoặc "STUDENT"

    if not full_name or not email or not password or not role:
        return jsonify({"message": "Thiếu dữ liệu (full_name, email, password, role)"}), 400
    
    if role not in ["TEACHER", "STUDENT"]:
        return jsonify({"message": "role chỉ được TEACHER hoặc STUDENT"}), 400

    # Check email đã tồn tại chưa
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "Email đã được sử dụng"}), 400

    hashed_pw = generate_password_hash(password)

    new_user = User(
        full_name=full_name,
        email=email,
        password_hash=hashed_pw,
        role=role
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "Đăng ký thành công",
        "user": {
            "id": new_user.id,
            "full_name": new_user.full_name,
            "email": new_user.email,
            "role": new_user.role
        }
    }), 201


# ------------ ĐĂNG NHẬP ------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Thiếu email hoặc password"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Sai email hoặc mật khẩu"}), 401

    if not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Sai email hoặc mật khẩu"}), 401

    # identity có thể là id, hoặc dict (id + role)
    access_token = create_access_token(
        identity={
            "id": user.id,
            "role": user.role,
            "full_name": user.full_name
        }
    )

    return jsonify({
        "message": "Đăng nhập thành công",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role
        }
    }), 200


# ------------ ROUTE ĐƯỢC BẢO VỆ BỞI JWT ------------
@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    current_user = get_jwt_identity()  # chính là identity đã truyền khi tạo token
    return jsonify({
        "message": "Thông tin từ token",
        "user": current_user
    }), 200
