from flask import Flask, request, jsonify
from flask_cors import CORS
from controllers.firebase_controller import hash_exists, add_hash
import hashlib

app = Flask(__name__)
CORS(app)

@app.route("/check-hash", methods=["POST"])
def check_hash():
    # Get IMG B64 from request json
    data = request.get_json()
    img_b64 = data["img_b64"]
    img_hash = hashlib.sha256(img_b64.encode()).hexdigest()
    if hash_exists(img_hash):
        return jsonify({"success": False, "message": "Image already exists"})
    add_hash(img_hash)
    return jsonify({"success": True, "message": "Image does not exist"})

if __name__ == "__main__":
    app.run(debug=True)
