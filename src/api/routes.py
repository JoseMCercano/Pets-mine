"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json, current_app
from api.models import db, User, Services
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_mail import Mail, Message
import random, string

api = Blueprint('api', __name__)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

#---------------------------------------------------------------------------------------------------
#             LOGIN ROUTE POST
#---------------------------------------------------------------------------------------------------

@api.route("/login", methods=["POST"])
def login():
    # Get input
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Query to get user info
    user = User.query.filter_by(email=email).first()
    ## If "user" query brings no data, then user doesn't exist
    if user is None:
        return jsonify({"msg":"User doesn't exist"}), 404

    encrypted_pass = current_app.bcrypt.check_password_hash(user.password, password)

    # Compared email and password, if one of them is not correct then it rejects the login attempt
    if email != user.email or not encrypted_pass:
        return jsonify({"msg": "Bad email or password"}), 401
    # Grants a token if login was successful
    else:
        access_token = create_access_token(identity=email)
            # Shows the token and the user info
        return jsonify({"msg": access_token,"user": user.serialize()}), 200

#---------------------------------------------------------------------------------------------------
#              PROFILE ROUTE GET
#---------------------------------------------------------------------------------------------------

@api.route("/profile", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    # Same as login, if the query brings nothing then it doesn't exist
    if user is None:
        return jsonify({"msg":"User doesn't exist"}), 404
    # If user is correct then it shows the user's info
    return jsonify({"user": user.serialize()}), 200



#---------------------------------------------------------------------------------------------------
#              LOGOUT ROUTE GET
#---------------------------------------------------------------------------------------------------

@api.route("/valid-token", methods=["GET"])
@jwt_required()
def valid_token():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    # Same as login, if the query brings nothing then it doesn't exist

    if current_user is None:
        return jsonify({"User not logged in"}), 422

    elif user is None:
        return jsonify({"status":False}), 404
    # If user is correct then it shows the user's info
    return jsonify({"status": True,"user": user.serialize()  }), 200

#===================================================================================================
#================================ SERVICES ROUTES ================================================
#---------------------------------------------------------------------------------------------------
#                       GET ALL SERVICES 
#---------------------------------------------------------------------------------------------------

@api.route('/service', methods=['GET'])
def get_services():

    services = Services.query.all()
    print(services)
    results = list(map(lambda x: x.serialize(), services))
    return jsonify(results), 200

#---------------------------------------------------------------------------------------------------
#                       GET SERVICE DETAILS 
#---------------------------------------------------------------------------------------------------

@api.route('/service/<int:service_id>', methods=['GET'])
def get_service(service_id):
   
    service = Services.query.filter_by(id=service_id).first()
    print(service)
    results = service.serialize()
    return jsonify(results), 200

#---------------------------------------------------------------------------------------------------
#                       POST SERVICE 
#---------------------------------------------------------------------------------------------------

@api.route('/service', methods=['POST'])
def create_service():
    
    body = json.loads(request.data)
    print(body)
    new_service = Services(
    name=body["name"],
    category=body["category"],
    description=body["description"],
    title=body["title"],   
    url=body["url"],
    url1=body["url1"],
    url2=body["url2"],    
    )
    print(new_service)
    # Flask command to add a new entry
    db.session.add(new_service)
    # Flask command to commit the database, saving the changes
    db.session.commit()
    # Standard response to request with error code 200 (success)
    return jsonify({"msg": "New serrvice created"}), 200

#---------------------------------------------------------------------------------------------------
#                       DELETE SERVICE  
#---------------------------------------------------------------------------------------------------    

@api.route('/service/<int:service_id>', methods=["DELETE"])
def delete_service(servie_id):

    service = Services.query.filter_by(id=service_id).first()
    print(service)
    if service is None:
        return jsonify({"msg": "Service not found"}), 404
    # If user exists, deletes it
    elif service:
        db.session.delete(service)
        db.session.commit()
        return jsonify({"msg": "Service deleted successfully"}), 200

#---------------------------------------------------------------------------------------------------
#                       PUT EDIT PACKAGE 
#---------------------------------------------------------------------------------------------------

@api.route('/service/<int:service_id>', methods=['PUT'])
def modify_service(service_id):

    body = json.loads(request.data)
    service = Services.query.filter_by(id=service_id).first()
    # If service exists, modifies it with new inputs
    if service is None:
        return json({"msg": "service not found"}), 404
    
    if "name" in body:
        service.name = body["name"]
    if "category" in body:
        service.category = body["category"]
    if "description" in body:
        service.description = body["description"]
    if "title" in body:
        service.title = body["title"]  
    if "url" in body:
        service.url = body["url"]
    if "url1" in body:
        service.url1 = body["url1"]
    if "url2" in body:
        service.url2 = body["url2"]
    

    db.session.commit()
    return jsonify({"msg":"Service updated successfully"}), 200

    #---------------------------------------------------------------------------------------------------
#                       POST  USER 
#---------------------------------------------------------------------------------------------------

@api.route('/user', methods=['POST'])
def create_user():
  
    body = json.loads(request.data)
    print(body)
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    # Filter by to check input email, this will be used in the if so email is never repeated
    user_query = User.query.filter_by(email=body["email"]).first()
    print(user_query)
    encrypted_pass = current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8')
    
    if username == "":
        return jsonify({"msg": "Invalid username"}), 406
    if email == "":
        return jsonify({"msg": "Email can't be empty"}), 406
    if password == "":
        return jsonify({"msg": "Password can't be empty"}), 406
    if user_query is None:
        # Table contents, same as the one in models.py
        new_user = User(
        username=body["username"],
        password=encrypted_pass,
        email=body["email"])
        print(new_user.serialize())
        # Flask command to add a new entry
        db.session.add(new_user)
        # Flask command to commit the database, saving the changes
        db.session.commit()
        # Standard response to request with error code 200 (success)
        return jsonify({"msg": "New user created"}), 200
    
    return jsonify({"msg": "User exists"}), 406
    
#===================================================================================================
#================================ USER ROUTES ================================================    
#---------------------------------------------------------------------------------------------------
#                       GET ALL USERS
#---------------------------------------------------------------------------------------------------

@api.route('/user', methods=['GET'])
def get_users():
   
    users = User.query.all()
    print(users)
    results = list(map(lambda x: x.serialize(), users))
    return jsonify(results), 200

#---------------------------------------------------------------------------------------------------
#                       GET USER DETAILS
#---------------------------------------------------------------------------------------------------

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
   
    user = User.query.filter_by(id=user_id).first()
    print(user)
    results = user.serialize()
    return jsonify(results), 200

#---------------------------------------------------------------------------------------------------
#                       DELETE USER
#---------------------------------------------------------------------------------------------------

@api.route('/user/<int:user_id>', methods=["DELETE"])
def delete_user(user_id):

    user = User.query.filter_by(id=user_id).first()
    print(user)
    # If user exists, deletes it
    if user is None:
        return jsonify({"msg" : 'User not found'}, 404)
    elif user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"msg": "User deleted successfully"}), 200

#---------------------------------------------------------------------------------------------------
#                       PUT EDIT USER
#---------------------------------------------------------------------------------------------------

@api.route('/user/<int:user_id>', methods=['PUT'])
# @jwt_required()
def modify_user(user_id):
    body = json.loads(request.data)
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({"msg": "User doesn't exist"}), 404

    if "email" in body:
        email_exists = User.query.filter_by(email=body["email"]).all()
        if email_exists:
            return jsonify({"msg": "Email already taken"}), 409 
        else:
            user.email = body["email"] 

    if "username" in body:
        username_exists = User.query.filter_by(username=body["username"]).all()
        if username_exists:
            return jsonify({"msg": "Username already taken"}), 409
        else:
            user.username = body["username"]

    print(user.serialize())
    # If user exists, modifies it with new inputs
    
    # if "username" in body:
    #     user.username = body["username"]
    # if "email" in body:
    #     user.email = body["email"] 
    if "password" in body:
        encrypted_pass = current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8')
        user.password = encrypted_pass   
    if "name" in body:
        user.name = body["name"]   
    if "lastname" in body:
        user.lastname = body["lastname"]
    if "country" in body:
        user.country = body["country"]
    if "user_url" in body:
        user.user_url = body["user_url"]   
    if "premium" in body:
        user.premium = body["premium"]   
    if "admin" in body:
        user.admin = body["admin"]   
    db.session.commit()
    return jsonify({"msg": "User updated successfully"}), 200

#---------------------------------------------------------------------------------------------------
#                           MODIFY USER PASSWORD
#---------------------------------------------------------------------------------------------------

@api.route('/user/password', methods=['POST'])
def modify_user_password():
    recover_email = request.json['email']
    #Random password
    recover_password = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(8)) 
    # If there's no input
    if not recover_email:
        return jsonify({"msg": "You must type an email address"}), 401
    user = User.query.filter_by(email=recover_email).first()
    print(user)
    # If user email doesn't exist
    if user is None:
        return jsonify({"msg": "User email doesn't exist"}), 404
    # Modifies user passowrd with new random password
    user.password = recover_password
    db.session.commit()
    msg = Message("Hello", recipients=[recover_email])
    msg.html = f"""<h1>Your new password is: {recover_password}</h1>"""
    current_app.mail.send(msg)
    return jsonify("Your password has been sent to your email"), 200
