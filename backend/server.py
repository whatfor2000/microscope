from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import os
from datetime import datetime
import cv2

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
camera = cv2.VideoCapture(0) # 0 for default webcam
serial = "unknow_serial"

def generate_frames():
    while True:
        global frame
        success, frame = camera.read()
        if not success:
            break
        global ret
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

#Server Stream the Camera to Frontend
@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/api/data', methods=['POST'])
def receive_data():
    global serial
    serial = request.json.get('input')  # Get JSON data from the request
    print(type(serial))
    return jsonify({'status': 'success', 'data': str(serial)})

#Capture By Server - Server is working on this
@app.route('/api/capture',methods=['GET'])
def capture():
    if ret:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filepath = os.path.join('gallery',str(serial)+"_"+f'{timestamp}.jpg')
        cv2.imwrite(filepath, frame)  # Save the frame
        return jsonify({'message': filepath+' captured successfully!'}), 200
    else:
        return jsonify({'error': 'Failed to capture frame'}), 500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)