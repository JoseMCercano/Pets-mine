from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    user_url = db.Column(db.String(250), nullable=True)
    premium = db.Column(db.Boolean, unique=False, default=False)
    admin = db.Column(db.Boolean, unique=False, default=False)

    # is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "user_url": self.user_url,
            "premium": self.premium,
            "admin": self.admin,
            # do not serialize the password, its a security breach
        }

class Services(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    category = db.Column(db.String(120), nullable=True)
    description = db.Column(db.String(950), nullable=True)
    title = db.Column(db.String(120), nullable=True)
    url = db.Column(db.String(250), nullable=True)
    url1 = db.Column(db.String(250), nullable=True)
    url2 = db.Column(db.String(250), nullable=True)

    def __repr__(self):
        return f'<Services {self.id}>'

    def serialize(self):
        return{
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "description": self.description,
            "title":self.title,
            "url": self.url,
            "url1": self.url1,
            "url2": self.url2,
        }