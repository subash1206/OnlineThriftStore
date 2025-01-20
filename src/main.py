import sys
from os.path import dirname, abspath
from flask import Flask  # Import Flask
from routes.payment import payment  # Import the payment blueprint

# Add project root directory to sys.path
sys.path.append(dirname(dirname(abspath(__file__))))

print("Before Flask import")
app = Flask(__name__)

# Register the payment blueprint
app.register_blueprint(payment)

@app.route("/")
def home():
    return "Welcome to the Flask App! Navigate to the appropriate endpoints."

if __name__ == "__main__":
    app.run(debug=True)
