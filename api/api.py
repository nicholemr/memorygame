import time
from flask import Flask, jsonify, render_template, redirect, request, session, flash, Response
from model import db, connect_to_db, User, Game

app = Flask(__name__)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/login', methods=['POST'])
def login_post():

    username = request.get_json()['username']
    # check if user in the db
    user = User.query.filter(
        User.username == username).first()
    print(user)

    if user:
        session['username'] = user.username
        print(user.username)
        return {'username': f'{user.username}',
                'loggedin': True,
                'games_played': f'{user.games_played}',
                'games_won': f'{user.games_won}'
                }
    else:
        # create user if not in db

        new_user = User(username=username, games_played=0, games_won=0)
        db.session.add(new_user)
        db.session.commit()
        print(f'new user created {new_user.username}')
        session['username'] = new_user.username
        return {'username': f'{new_user.username}',
                'loggedin': True,
                'games_played': f'{user.games_played}',
                'games_won': f'{user.games_won}'
                }


@app.route('/login', methods=['GET'])
def login_get():

    if session.get('username'):
        username = session.get('username')
        user = User.query.filter(
            User.username == username).first()
        print(username)
        return {'username': f'{user.username}',
                'loggedin': True,
                'games_played': f'{user.games_played}',
                'games_won': f'{user.games_won}'
                }


@app.route('/logout')
def logout():
    session.clear()

    return {'loggedin': False}


@app.route('/update-user', methods=['POST'])
def update_user():
    '''update User and Game tables with current user win'''
    username = session.get('username')
    user = User.query.filter(
        User.username == username).first()

    game_obj = Game(user_id=user.user_id, won_lost='won')

    user.games_played += 1
    user.games_won += 1

    db.session.add(game_obj)
    db.session.commit()

    print(game_obj.game_id, game_obj.user_id, user.games_played)

    return {
        'msg': 'user updated',
        'games_played': f'{user.games_played}',
        'games_won': f'{user.games_won}',
    }


if __name__ == "api":
    app.secret_key = "SECRET!"
    connect_to_db(app)
    # app.run(port=5000, host="0.0.0.0", debug=True)
