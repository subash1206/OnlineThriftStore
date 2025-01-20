from flask import Blueprint, request, jsonify

api = Blueprint('api', __name__)

@api.route('/api/verify-payment', methods=['POST'])
def verify_payment():
    data = request.json
    payment_id = data.get('paymentId')
    
    if not payment_id:
        return jsonify({"success": False, "message": "Payment ID is missing"}), 400
    
    # Mock verification logic
    if payment_id == "sample-payment-id":
        return jsonify({"success": True, "message": "Payment verified successfully"})
    else:
        return jsonify({"success": False, "message": "Invalid payment ID"}), 400
