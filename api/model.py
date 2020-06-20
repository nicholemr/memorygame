from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_to_db(app):
    # Connect app with db

    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql:///memory"
    app.config["SQLALCHEMY_ECHO"] = False
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # setting up .app attribute and passing in app
    db.app = app
    db.init_app(app)


class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), nullable=False)
    games_played = db.Column(db.Integer, nullable=False)
    games_won = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        """show info about a User instance"""
        return f'<User id = {self.user_id}>'


class Game(db.Model):
    __tablename__ = 'games'

    game_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.user_id'), nullable=False)
    won_lost = db.Column(db.String(100), nullable=False)

    user = db.relationship('User', backref=db.backref('games'))

    def __repr__(self):
        """show info about a Record instance"""
        return f'<Game ID = {self.game_id}>'


if __name__ == "__main__":
    from api import app
    connect_to_db(app)
    db.create_all()

    # Cat.query.delete()
    # # add users:
    # ziggy = User(username='ziggy', games_played=0, games_won=0)
    # db.session.add(ziggy)
    # db.session.commit()
