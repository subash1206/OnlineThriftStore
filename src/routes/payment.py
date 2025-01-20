from flask import Blueprint, request, jsonify

payment = Blueprint('payment', __name__)

@payment.route('/api/verify-payment', methods=['POST'])
def verify_payment():
    data = request.json
    order_id = data.get('orderId')

    if not order_id:
        return jsonify({"success": False, "message": "Order ID is missing"}), 400

    # Mock verification logic
    if order_id == "valid-order-id":
        return jsonify({"success": True, "message": "Payment verified successfully"})
    else:
        return jsonify({"success": False, "message": "Invalid order ID"}), 400
