from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from core.config import Config
from core.database import db

# Import models để create_all không lỗi FK
from models.user import User
from models.class_ import Class      # hoặc class_model nếu bạn đã đổi tên
from models.assignment import Assignment
from models.class_member import ClassMember
from models.exam_code import ExamCode
from models.exam_answer import ExamAnswer

# Import blueprint
from routes.auth_routes import auth_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

# Khởi tạo JWT-Extended
jwt = JWTManager(app)

# CORS cho phép frontend (React Native) gọi API
CORS(app, supports_credentials=True)

# Đăng ký blueprint
app.register_blueprint(auth_bp)

# Tạo bảng
with app.app_context():
    db.create_all()
    print("✅ Đã tạo bảng (nếu chưa có).")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
